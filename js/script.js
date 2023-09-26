/** @format */

const authors = {
	1: 'Sigrid Lydvo',
};

document.addEventListener('DOMContentLoaded', () => {
	fetchPosts();
});

function fetchPosts() {
	let apiUrl =
		'https://www.thatsumsitallup.site/wp-json/wp/v2/posts?orderby=date&order=desc';

	if (window.location.pathname.includes('index.html')) {
		apiUrl += '&per_page=3'; // Only fetch the last 4 posts for homepage
	} else if (window.location.pathname.includes('archieve.html')) {
		apiUrl += '&per_page=12'; // Fetch 12 posts for the archive page
	}

	fetch(apiUrl)
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
						displayPost(post);
					});
			});
		})
		.catch((error) => console.error('Error fetching posts:', error));
}

function displayPost(post) {
	let postsContainer; 

	if (window.location.pathname.includes('index.html')) {
		postsContainer = document.querySelector('.latest-posts');
	} else if (window.location.pathname.includes('archieve.html')) {
		postsContainer = document.querySelector('.all-posts');
	}



	const postElement = document.createElement('div');
	postElement.className = 'post-summary';

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
