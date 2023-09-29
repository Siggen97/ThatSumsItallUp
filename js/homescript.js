/** @format */

const authors = {
	1: 'Sigrid Lydvo',
};

document.addEventListener('DOMContentLoaded', () => {
	fetchPosts(3);
});

function fetchPosts(perPage) {
	const apiUrl = `https://www.thatsumsitallup.site/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=${perPage}`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((posts) => posts.forEach(fetchAndDisplayPost))
		.catch((error) => console.error('Error fetching posts:', error));
}

function fetchAndDisplayPost(post) {
	fetch(
		`https://www.thatsumsitallup.site/wp-json/wp/v2/media/${post.featured_media}`
	)
		.then((response) => response.json())
		.then((media) => {
			post.mediaUrl = media.source_url;
			displayPost(post);
		})
		.catch((error) => console.error('Error fetching media:', error));
}

function displayPost(post) {
	const postsContainer = document.querySelector('.latest-posts');
	const postElement = document.createElement('div');
	postElement.className = 'post-summary';
	postElement.innerHTML = `
        <a href="post.html?id=${post.id}">
            <h3>${post.title.rendered}</h3>
            <img class="post-img" src="${post.mediaUrl}" alt="${post.title.rendered}">
        </a>
        <p>${post.excerpt.rendered}</p>
        <p>Author: ${authors[post.author] || 'Unknown'}</p>
        <p>Date: ${new Date(post.date).toLocaleDateString()}</p>
        <a href="post.html?id=${post.id}">Read more</a>
    `;
	postsContainer.appendChild(postElement);
}
