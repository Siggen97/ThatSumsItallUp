/** @format */

const authors = {
	1: 'Sigrid Lydvo',
};

let offset = 0;
const postsPerPage = 8;

document.addEventListener('DOMContentLoaded', () => {
	fetchPosts(postsPerPage);

	const loadMoreBtn = document.createElement('button');
	loadMoreBtn.innerText = 'Load More';
	loadMoreBtn.addEventListener('click', () => {
		offset += postsPerPage;
		fetchPosts(4); // or fetchPosts(postsPerPage)
	});
	document.querySelector('.loadmore').appendChild(loadMoreBtn);
});

function fetchPosts(perPage) {
	const apiUrl = `https://www.thatsumsitallup.site/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=${perPage}&offset=${offset}`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((posts) => displayPosts(posts))
		.catch((error) => console.error('Error fetching posts:', error));
}

function displayPosts(posts) {
	const postsContainer = document.querySelector('.all-posts');

	posts.forEach((post) => {
		const postElement = document.createElement('div');
		postElement.className = 'post-summary';
		postElement.innerHTML = `
            <h3>${post.title.rendered}</h3>
            <p>${post.excerpt.rendered}</p>
            <p>Author: ${authors[post.author] || 'Unknown'}</p>
            <p>Date: ${new Date(post.date).toLocaleDateString()}</p>
            <a href="post.html?id=${post.id}">Read more</a>
        `;
		postsContainer.appendChild(postElement);
	});
}
