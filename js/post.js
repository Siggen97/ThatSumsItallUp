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
        <h1 class="post-content">${post.title.rendered}</h1>
		<p>Date Published: ${new Date(post.date).toLocaleDateString()}</p>
        <div class="post-content">${post.content.rendered}</div>
        ${
			post.mediaUrl
			? `<img src="${post.mediaUrl}" alt="${post.title.rendered}" class="featured-media">`
			: ''
		}
		<p>Date Modified: ${new Date(post.modified).toLocaleDateString()}</p>
        <p>Author: ${post.authorName}</p>
        
        <div class="comment-section">
            <h2>Leave a Comment</h2>
            <form id="comment-form">
                <label for="comment-author">Name:</label>
                <input type="text" id="comment-author" name="author" required>
                
                <label for="comment-content">Comment:</label>
                <textarea class="comment-content" name="content" rows="6" required></textarea>
                
                <button class="submit-comment" type="submit">Submit Comment</button>
            </form>
        </div>
    `;



	// Add event listener
	document
		.getElementById('comment-form')
		.addEventListener('submit', handleCommentSubmission);
}
function handleCommentSubmission(event) {
	event.preventDefault();

	const authorName = event.target.elements.author.value;
	const content = event.target.elements.content.value;

	const commentData = {
		post: postId,
		author_name: authorName,
		content: content,
	};

	fetch('https://www.thatsumsitallup.site/wp-json/wp/v2/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(commentData),
	})
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => {
					throw err;
				});
			}
			return response.json();
		})
		.then((data) => {
			if (data.id) {
				alert('Comment submitted for moderation.');
				event.target.reset(); // Reset the form
			} else {
				alert('Error submitting comment.');
			}
		})
		.catch((error) => console.error('Error submitting comment:', error));
}
