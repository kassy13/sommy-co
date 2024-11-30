


// Countdown Timer Logic
function startCountdown(endDate) {
  const timerElement = document.getElementById("timer");
  
  const interval = setInterval(function () {
    const now = new Date().getTime();
    const distance = endDate - now;

    // Calculate time left
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If countdown finishes
    if (distance < 0) {
      clearInterval(interval);
      timerElement.innerHTML = "EXPIRED";
    }
  }, 1000);
}

// Set the end date of the deal (example: 1 day from now)
const endDate = new Date().getTime() + 72 * 60 * 60 * 1000; // 24 hours from now
startCountdown(endDate);


document.addEventListener('DOMContentLoaded', ()=> {

  const fetchCategories = async ()=>{
    const response = await fetch("https://fakestoreapi.in/api/products/category");
    console.log(response);
    const result = await response.json();
    console.log(result)
    
      // Filtering categories where id < 10
  result.categories.forEach((category) => {
        const categoriesContainer = document.querySelector('.custom-hero-categories-list');
        const categoriesHTML = `<li><a href="categoryProducts.html?category=${category}"> ${category} </a></li>`;
        categoriesContainer.insertAdjacentHTML('beforeend', categoriesHTML);
  
        const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get('category');  // Get the category Name from the URL
  
  const fetchProducts = async (categoryId) => {
    const response = await fetch(`https://fakestoreapi.in/api/products/category?type=mobile`);
    const products = await response.json();
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';  // Clear previous products
    console.log("response",response)
    console.log("products",products)
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p><strong>Price: $${product.price}</strong></p>
        <p>Category: ${product.category}</p>
      `;
      productsContainer.appendChild(productElement);
    });
  };
  
  fetchProducts(categoryName);
      });
  }
  fetchCategories()
})