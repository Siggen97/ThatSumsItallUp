/** @format */

const postContainer = document.getElementById('single-post-content');
const authors = {
	1: 'Sigrid Lydvo',
	// Add more authors as needed
};

// Get post ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (postId) {
	fetchPostDetails(postId);
}

function fetchPostDetails(id) {
	fetch(`https://www.thatsumsitallup.site/wp-json/wp/v2/posts/${id}`)
		.then((response) => response.json())
		.then((post) => {
			// Fetch associated media and author, then display post
			fetchMedia(post.featured_media)
				.then((mediaUrl) => {
					post.mediaUrl = mediaUrl;
					return fetchAuthor(post.author);
				})
				.then((authorName) => {
					post.authorName = authorName;
					displaySinglePost(post);
				});
		})
		.catch((error) => {
			console.error('Error fetching post:', error);
			// Handle the error, maybe display a user-friendly message
		});
}

function fetchMedia(mediaId) {
	return fetch(
		`https://www.thatsumsitallup.site/wp-json/wp/v2/media/${mediaId}`
	)
		.then((response) => response.json())
		.then((media) => media.source_url);
}

function fetchAuthor(authorId) {
	if (authors[authorId]) {
		// Check if we already have the author's details
		return Promise.resolve(authors[authorId]);
	}
	return fetch(
		`https://www.thatsumsitallup.site/wp-json/wp/v2/users/${authorId}`
	)
		.then((response) => response.json())
		.then((author) => {
			authors[authorId] = author.name; // Cache the author's name
			return author.name;
		});
}

function displaySinglePost(post) {
	postContainer.innerHTML = `
        <h1>${post.title.rendered}</h1>
        <p>Date Modified: ${new Date(post.modified).toLocaleDateString()}</p>
        <div>${post.content.rendered}</div>
        ${
            post.mediaUrl
            ? `<img src="${post.mediaUrl}" alt="${post.title.rendered}" class="featured-media">`
            : ''
        }
        <p>Date Published: ${new Date(post.date).toLocaleDateString()}</p>
        <p>Author: ${post.authorName}</p>
    `;
}
