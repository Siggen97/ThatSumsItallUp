# ThatSumsItallUp
Project for a football website Blog.

Here you will find blog posts about the football in England, more specific The Premier League. We we also write a bit about football outside england, and also cover champions league, european league, and some national football. 
We will have guest writers and permanent authors for the posts on this blog. We are always open for new geust writers, and are highly valued and have good quality posts, then there is always possible to become one of our permanent writers, and contribute more to the website and have more influence in how to website develops.

We use wordpress to create blog posts, and have a REST API to access them. Our photos or images are from open free sources. 



Project Exam 1
Goal
To put into practice the skills learned over your first year of studies.

Brief
You have been tasked with creating a blog site. You can choose the design and topics covered on the blog, but it should have at least the following pages:

Home page
About page
List of blog posts
Blog post specific pages
Contact page.
Home Page
The home page should have a ‘Latest Posts’ section which uses a carousel (slider) for users to click to view more posts. For example, by default the user can see four posts, then they can click an arrow on the right to view the next four posts, and click it again to view the next four posts. The user can also click back to view results they had previously seen. This must be implemented for desktop at least, but if you want a simpler layout for mobile, you can change it from being in a carousel.

Blog Page
The blog posts page should show the first 10 blogs, and the user should click to view more results which then show underneath the first 10 blogs.

Blog Specific Page
The content of the blog specific page should be dynamically built using a query string parameter based on whatever link the user clicked. The title of the blog specific page should change based on the blog that has been clicked on e.g. “My Blog | An Article I Wrote”.

If images on the blog post page are clicked, a modal should appear giving the user a bigger view of that image. Clicking outside the image should hide the modal.

Contact page
Create a contact us page, there should be 4 textboxes on this page.

Name (Should be more than 5 characters long)
Email address (Must be a valid email address)
Subject (Should be more than 15 characters long)
Message content (Should be more than 25 characters long)
Please use JavaScript for validation, show error messages if the values in the textboxes do not meet the requirements.

WordPress
The content for your website will be stored on a WordPress installation used as a Headless CMS. It’s important to note that we are only using WordPress to provide an API and add content for the blog. You should not submit a link to a WordPress site, but build your website using HTML, CSS and JavaScript and making a call to the WordPress REST API to fetch the data.

The project has two aspects:

API from your WordPress installation
Your website built with HTML, CSS and JavaScript
You will need to add at least 12 blogs for your website. You can use lorem ipsum for paragraphs if you need, but headings, images etc. should all make sense.

Note that this is an exam, and therefore tutor support will be limited as per the study plan.

Level 1 Process
Decide on the theme for the blog you’re going to make
Create a prototype of the website
Install WordPress on your web host and add the blogs on the admin panel.
Use the GitHub repo created by GitHub Classroom for your files and deploy to Netlify
Build your website using HTML, CSS and JavaScript making a call to the WordPress REST API to fetch your data.
Install Hotjar on your website.
Ask users to test your website, and adjust based on their feedback and any insights from Hotjar.
Write a report documenting your project (template provided in this repository).
Submit your report as a PDF and a link to both your Netlify deployment and your GitHub repo.
Level 2 Process (optional)
You can try adding a sort, filter, or search to the blog posts page allowing users to find the blog post more easily that they’re looking for.
Post the data from the contact form to WordPress so you have the details saved.
Allow users to submit comments on a blog post, and post this data to WordPress