/** @format */

const authors = {
	1: 'Sigrid Lydvo',
	// Add more authors as needed
};

document.addEventListener('DOMContentLoaded', () => {
	fetchPosts();
});

function fetchPosts() {
	fetch(
		'https://www.thatsumsitallup.site/wp-json/wp/v2/posts?orderby=date&order=desc'
	)
		.then((response) => response.json())
		.then((posts) => {
			// Fetch the media for each post
			posts.forEach((post) => {
				fetch(
					`https://www.thatsumsitallup.site/wp-json/wp/v2/media/${post.featured_media}`
				)
					.then((response) => response.json())
					.then((media) => {
						post.mediaUrl = media.source_url; // Add the media URL to the post object
						displayPost(post); // Display the post once we have its media
					});
			});
		})
		.catch((error) => console.error('Error fetching posts:', error));
}


function displayPost(post) {
	const postsContainer = document.querySelector('main > section > div');

	const postElement = document.createElement('div');
	postElement.className = 'post-summary';

	// Create the anchor tag for the post link
	const postLink = `post.html?id=${post.id}`;

	postElement.innerHTML = `
        <a href="${postLink}" class="post-title-link"><h3>${
		post.title.rendered
	}</h3></a>
        ${
					post.mediaUrl
						? `<a href="${postLink}" class="featured-media-link"><img src="${post.mediaUrl}" alt="${post.title.rendered}" class="featured-media"></a>`
						: ''
				}
        <p>${post.excerpt.rendered}</p>
        <p>Author: ${authors[post.author] || 'Unknown'}</p>
        <p>Date: ${new Date(post.date).toLocaleDateString()}</p>
        <a href="${postLink}">Read more</a>
    `;

	postsContainer.appendChild(postElement);
}

