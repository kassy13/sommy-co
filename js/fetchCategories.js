// // scripts/fetchCategories.js

// // Fetch and display categories in the navigation
// const fetchCategories = async () => {
//     try {
//       // Fetch categories from the correct API endpoint
//       const response = await fetch("https://fakestoreapi.in/api/products/category");
//       if (!response.ok) {
//         throw new Error(`Failed to fetch categories. Status: ${response.status}`);
//       }
  
//       const categories = await response.json(); // Assuming categories is an array
//       console.log("Categories:", categories);
  
//       // Select the container where categories will be inserted
//       const categoriesContainer = document.querySelector('.custom-hero-categories-list');
//       if (!categoriesContainer) {
//         console.error("Categories container not found in the HTML.");
        
//         return;
//       }
  
//       // Add each category as a list item with a link
//       categories.categories.forEach((category) => {
//         const categoriesHTML = `<li><a href="categoryProducts.html?category=${category}">${category}</a></li>`;
//         categoriesContainer.insertAdjacentHTML('beforeend', categoriesHTML);
//       });
//     } catch (error) {
//       console.error("Error fetching categories:", error.message);
//     }
//   };
  
//   // Call the function on page load
//   document.addEventListener("DOMContentLoaded", fetchCategories);
  


// // scripts/fetchCategories.js

// Fetch and display categories in the navigation
// const fetchCategories = async () => {
//     try {
//       // Show the preloader
//       document.getElementById('preloader').style.display = 'flex';
  
//       // Fetch categories from the correct API endpoint
//       const response = await fetch("https://api.storerestapi.com/categories");
//       if (!response.ok) {
//         throw new Error(`Failed to fetch categories. Status: ${response.status}`);
//       }
  
//       const categories = await response.json(); // Assuming categories is an array
//       console.log("Categories:", categories);
  
//       // Select the container where categories will be inserted
//       const categoriesContainer = document.querySelector('.custom-hero-categories-list');
//       if (!categoriesContainer) {
//         console.error("Categories container not found in the HTML.");
//         return;
//       }
  
//       // Add each category as a list item with a link
//       categories.data.forEach((category) => {
//         const categoriesHTML = `<li><a href="categoryProducts.html?category=${category.name}">${category.name}</a></li>`;
//         categoriesContainer.insertAdjacentHTML('beforeend', categoriesHTML);
//       });
      
//       // Hide preloader and show main content
//       document.getElementById('preloder').style.display = 'none';
//       document.getElementById('mainContent').style.display = 'block';
//     } catch (error) {
//       console.error("Error fetching categories:", error.message);
//       // In case of an error, hide the preloader and show the main content
//       document.getElementById('preloder').style.display = 'none';
//       document.getElementById('mainContent').style.display = 'block';
//     }
//   };
  
//   // Call the function on page load
// //   document.addEventListener("DOMContentLoaded", fetchCategories);

  

const fetchCategories = async () => {
    try {
        // Show the categories preloader
        const categoriesPreloader = document.getElementById('categories-preloader');
        if (categoriesPreloader) {
            categoriesPreloader.style.display = 'flex';
        }

        // Fetch categories from the API
        const response = await fetch("https://dummyjson.com/products/category-list");
        if (!response.ok) {
            throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }

        const categories = await response.json(); // Assuming categories is an array
        console.log("Categories:", categories);

        // Select the container where categories will be inserted
        const categoriesContainer = document.querySelector('.custom-hero-categories-list');
        if (!categoriesContainer) {
            console.error("Categories container not found in the HTML.");
            return;
        }

        // If no categories are returned, show a message
        if (categories && categories.length > 0) {
            categories.forEach((category) => {
                const categoryHTML = `<li><a href="categoryProducts.html?category=${category}">${category}</a></li>`;
                categoriesContainer.insertAdjacentHTML('beforeend', categoryHTML);
            });
        } else {
            // Show a custom message if no categories are available
            categoriesContainer.innerHTML = '<p>No categories available at the moment.</p>';
        }

    } catch (error) {
        console.error("Error fetching categories:", error.message);
        // In case of an error, show the error message or a fallback message
        const categoriesContainer = document.querySelector('.custom-hero-categories-list');
        if (categoriesContainer) {
            categoriesContainer.innerHTML = '<p>Error loading categories. Please try again later.</p>';
        }
    } finally {
        // Hide categories preloader and show the main content
        const categoriesPreloader = document.getElementById('categories-preloader');
        const preloader = document.getElementById('preloder');
        if (categoriesPreloader) categoriesPreloader.style.display = 'none';
        if (preloader) preloader.style.display = 'none';
        const mainContent = document.getElementById('mainContent');
        if (mainContent) mainContent.style.display = 'block';
    }
};

// Ensure DOM content is fully loaded before fetching categories
window.addEventListener("load", fetchCategories);


const fetchPopularProducts = async () => {
    try {
        // Fetch all products (you can adjust the limit if needed)
        const response = await fetch('https://dummyjson.com/products?limit=30');
        if (!response.ok) {
            throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }
        const products = await response.json();
        console.log('products',products)
        // Ensure there are products to select from
        if (!products || products.length === 0) {
            console.error('No products found.');
            return;
        }

        // Shuffle products to get random selection
        const randomProducts = getRandomProducts(products, 10);

        // Select the container where products will be inserted
        const productsContainer = document.querySelector('.swiper-wrapper-popular');
        if (!productsContainer) {
            console.error("Products container not found in the HTML.");
            return;
        }

        // Clear any previous products
        productsContainer.innerHTML = '';

        // Insert the products into the HTML
        randomProducts.forEach(product => {
            const stars = Math.round(product.rating); // Round the rating to the nearest whole number
            const starHTML = Array(5)
                .fill(`<i class="ri-star-fill"></i>`, 0, stars) // Fill with solid stars for the rating
                .fill('<i class="ri-star-line"></i>', stars)   // Fill with empty stars for the rest
                .join('');
        
            const productHTML = `
                <div class="swiper-slide">
                    <div class="product-card">
                        <div class="popular-product-img"> 
                            <img src="${product.images[0]}" alt="${product.title}" class="product-image">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name"> 
                                <a href="product-details.html?id=${product.id}">${product.title}</a>
                            </h3>
                            <p class="product-price">$${product.price.toFixed(2)}</p>
                            <div class="product-rating">
                                <span class="stars">${starHTML}</span> 
                                <span class="rating-number">(${product.rating.toFixed(1)})</span>
                            </div>
                            <p class="product-availability">${product.availabilityStatus}</p>
                        </div>
                        <div class="category-top"> 
                            <p>${product.category}</p> 
                        </div>
                        <!-- Hover Controls -->
                        <div class="product-controls">
                            <button class="add-to-cart">
                                <i class="ri-shopping-cart-2-line"></i> 
                            </button>
                            <button class="add-to-wishlist">
                                <i class="ri-heart-line"></i> 
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productHTML);
        });
        

    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
};

// Helper function to shuffle and get random products
const getRandomProducts = (products, count) => {
    const shuffled = products.products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Fetch popular products when the page loads
window.addEventListener('load', fetchPopularProducts);


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