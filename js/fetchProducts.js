// scripts/fetchProducts.js

// Fetch and display products for a specific category
// let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve existing cart items

// const fetchProducts = async (categoryName = '', searchTerm = '', page = 1, itemsPerPage = 8) => {
//   try {
//     const url = new URL(`https://api.storerestapi.com/products?categoryId=${categoryId}`);
//     if (categoryName) url.searchParams.set("type", categoryName);

//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`Failed to fetch products for category: ${categoryName}`);

//     const { products } = await response.json();
//     console.log("Products:", products);

//     // Filter products by search term
//     const filteredProducts = products.filter(product =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const start = (page - 1) * itemsPerPage;
//     const paginatedProducts = filteredProducts.slice(start, start + itemsPerPage);
//     const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//     // Render products
//     renderProducts(paginatedProducts);

//     // Render pagination
//     renderPagination(totalPages, page, categoryName, searchTerm);
//   } catch (error) {
//     console.error("Error fetching products:", error.message);
//   }
// };

// const renderProducts = (products) => {
//   const productsContainer = document.getElementById("products-container");
//   productsContainer.innerHTML = ""; // Clear previous products

//   products.forEach(product => {
//     const productElement = document.createElement("div");
//     productElement.classList.add("product");
//     productElement.innerHTML = `
//       <h3>${product.title}</h3>
//       <img src="${product.image}" alt="${product.title}">
//       <p><strong>Price: $${product.price}</strong></p>
//       <div class="cta-buttons">
//         <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
//         <button class="like" data-id="${product.id}">♥ Like</button>
//       </div>
//     `;
//     productsContainer.appendChild(productElement);
//   });

//   // Add event listeners for buttons
//   document.querySelectorAll('.add-to-cart').forEach(button => {
//     button.addEventListener('click', (e) => {
//       const productId = e.target.dataset.id;
//       const selectedProduct = products.find(product => product.id == productId);
//       addToCart(selectedProduct);
//     });
//   });

//   document.querySelectorAll('.like').forEach(button => {
//     button.addEventListener('click', (e) => {
//       const productId = e.target.dataset.id;
//       console.log(`Product ${productId} liked!`);
//       alert(`You liked product ${productId}`);
//     });
//   });
// };

// const addToCart = (product) => {
//   if (!cart.some(item => item.id === product.id)) {
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
//     alert(`${product.title} added to cart!`);
//   } else {
//     alert(`${product.title} is already in the cart.`);
//   }
// };

// const renderPagination = (totalPages, currentPage, categoryName, searchTerm) => {
//   const paginationContainer = document.getElementById("pagination-container");
//   paginationContainer.innerHTML = ""; // Clear previous pagination

//   for (let i = 1; i <= totalPages; i++) {
//     const button = document.createElement("button");
//     button.classList.add("pagination-button");
//     if (i === currentPage) button.classList.add("active");
//     button.textContent = i;

//     button.addEventListener("click", () => {
//       fetchProducts(categoryName, searchTerm, i);
//     });

//     paginationContainer.appendChild(button);
//   }
// };

// // Add event listeners for filtering
// document.getElementById("apply-filter").addEventListener("click", () => {
//   const category = document.getElementById("filter-category").value;
//   const searchTerm = document.getElementById("search-box").value;
//   fetchProducts(category, searchTerm);
// });

// // Initial fetch on page load
// document.addEventListener("DOMContentLoaded", () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const categoryName = urlParams.get("category") || "";
//   fetchProducts(categoryName);
// });


const fetchCategoryProducts = async (category) => {
    try {
        // Show a loading message or preloader
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            productsContainer.innerHTML = '<p>Loading products...</p>';
        }

        // Fetch products for the given category from the API
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch products for category ${category}. Status: ${response.status}`);
        }

        const products = await response.json(); // This contains the products object
        console.log("Products:", products.products); // Now log the actual products array

        // Display products
        if (products && products.products && products.products.length > 0) {
            productsContainer.innerHTML = ''; // Clear loading message
            products.products.forEach((product) => { // Use products.products to access the array
                const productHTML = `
                    <div class="product">
                        <img src="${product.images[0] || 'https://via.placeholder.com/150'}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>$${product.price}</p>
                    </div>
                `;
                productsContainer.insertAdjacentHTML('beforeend', productHTML);
            });
        } else {
            productsContainer.innerHTML = '<p>No products found in this category.</p>';
        }
    } catch (error) {
        console.error("Error fetching category products:", error.message);
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }
};

// Fetch and display products when the page is loaded
window.addEventListener("load", () => {
    const category = new URLSearchParams(window.location.search).get('category');
    console.log(category)
    fetchCategoryProducts(category)
    // if (category) {
    //     fetchCategoryProducts(category);
    // } else {
    //     console.error("No category found in the URL.");
    // }
});
