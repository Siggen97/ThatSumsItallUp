/** @format */

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('form').addEventListener('submit', function (e) {
		e.preventDefault();

	
		document.getElementById('nameError').textContent = '';
		document.getElementById('emailError').textContent = '';
		document.getElementById('messageError').textContent = '';

	
		let isValid = true;

	
		const name = document.getElementById('name').value;
		if (name.length <= 5) {
			document.getElementById('nameError').textContent =
				'Name should be more than 5 characters long';
			isValid = false;
		}

	
		const email = document.getElementById('email').value;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			document.getElementById('emailError').textContent =
				'Must be a valid email address';
			isValid = false;
		}

	
		const message = document.getElementById('message').value;
		if (message.length <= 25) {
			document.getElementById('messageError').textContent =
				'Message should be more than 25 characters long';
			isValid = false;
		}

		// If valid
		if (isValid) {
			// Implement form submission here, e.g., sending data to the server
		}
	});
});
