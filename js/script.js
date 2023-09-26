/** @format */

const authors = {
    1: 'Sigrid Lydvo',
};


let offset = 0; 
const postsPerPage = 8;

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts(postsPerPage); // Fetch 8 posts

    // "load more" button functionality
    if (window.location.pathname.includes('archieve.html')) {
        const loadMoreBtn = document.createElement('button');
		loadMoreBtn.addClassName
        loadMoreBtn.innerText = 'Load More';
        loadMoreBtn.addEventListener('click', () => {
					offset += postsPerPage;
					fetchPosts(4); // load 4 more
				});

        // "load more" button 
        document
					.querySelector('.main-archive .loadmore')
					.appendChild(loadMoreBtn);
    }
});
function fetchPosts(perPage) {
    let apiUrl = `https://www.thatsumsitallup.site/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=${perPage}&offset=${offset}`;

    // If homepage, only fetch the last 3 posts
    if (window.location.pathname.includes('index.html')) {
        apiUrl += '&per_page=3';
    }

    fetch(apiUrl)
        .then((response) => response.json())
        .then((posts) => {
            posts.forEach((post) => {
                fetch(`https://www.thatsumsitallup.site/wp-json/wp/v2/media/${post.featured_media}`)
                    .then((response) => response.json())
                    .then((media) => {
                        post.mediaUrl = media.source_url; 
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
