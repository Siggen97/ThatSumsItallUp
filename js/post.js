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

	// Add event listener to the form
	document
		.getElementById('comment-form')
		.addEventListener('submit', handleCommentSubmission);
}
function handleCommentSubmission(event) {
	event.preventDefault();

	const authorName = document.getElementById('comment-author').value;
	const content = document.getElementById('comment-content').value;

	const commentData = {
		post: postId, // relates the comment to the post
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
		.then((response) => response.json())
		.then((data) => {
			if (data.id) {
				alert('Your comment has been submitted and is awaiting moderation.');
				// Clear the form fields after successful submission
				document.getElementById('comment-author').value = '';
				document.getElementById('comment-content').value = '';
			} else {
				alert('There was an error submitting your comment.');
			}
		})
		.catch((error) => {
			console.error('Error submitting comment:', error);
		});
}
