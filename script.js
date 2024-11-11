// Variables
const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');
let isLoading = false;
let page = 1;  // Keeps track of the current page of posts

// Function to fetch posts from an API (you can replace with your own API URL)
async function fetchPosts(page) {
  isLoading = true;
  loader.style.display = 'block';  // Show the loader

  // Example API URL. Replace with your actual API.
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
  const posts = await response.json();

  // Hide the loader once posts are fetched
  loader.style.display = 'none';
  isLoading = false;

  return posts;
}

// Function to create and append post elements to the container
function renderPosts(posts) {
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Function to handle infinite scroll logic
function handleScroll() {
  // Check if the user is near the bottom of the page
  const scrollPosition = window.innerHeight + window.scrollY;
  const bottomPosition = document.documentElement.scrollHeight;

  if (!isLoading && scrollPosition >= bottomPosition - 100) {
    // Fetch and render more posts if near the bottom
    page++;
    fetchPosts(page).then(posts => renderPosts(posts));
  }
}

// Initial fetch of posts when the page loads
fetchPosts(page).then(posts => renderPosts(posts));

// Add event listener for scrolling
window.addEventListener('scroll', handleScroll);
