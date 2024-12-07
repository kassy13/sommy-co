// const fetchCategoryProducts = async (category) => {
//   console.log("ghhvfhcgjhvlkjbl;vhljgchgjvhkbj");
//   try {
//     // Show a loading message or preloader
//     const productsContainer = document.getElementById("products-container");
//     if (productsContainer) {
//       productsContainer.innerHTML = "<p>Loading products...</p>";
//     }

//     // Fetch products for the given category from the API
//     const response = await fetch(
//       `https://dummyjson.com/products/category/${category}`
//     );
//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch products for category ${category}. Status: ${response.status}`
//       );
//     }

//     const products = await response.json(); // This contains the products object
//     console.log("Products:", products.products); // Now log the actual products array

//     // Display products
//     if (products && products.products && products.products.length > 0) {
//       productsContainer.innerHTML = ""; // Clear loading message
//       products.products.forEach((product) => {
//         // Use products.products to access the array
//         const productHTML = `
//                     <div class="product">
//                         <div class="product-card">
//                         <div class="popular-product-img">
//                             <img src="${product.images[0]}" alt="${
//           product.title
//         }" class="product-image">
//                         </div>
//                         <div class="product-info">
//                             <h3 class="product-name">
//                                 <a class="shorten" href="product-details.html?id=${
//                                   product.id
//                                 }">${product.title}</a>
//                             </h3>
//                             <p class="product-price">$${product.price.toFixed(
//                               2
//                             )}</p>

//                             <p class="product-availability">${
//                               product.availabilityStatus
//                             }</p>
//                         </div>
//                         <div class="category-top">
//                             <p>${product.category}</p>
//                         </div>
//                         <!-- Hover Controls -->
//                         <div class="product-controls">
//                             <button class="add-to-cart">
//                                 <i class="ri-shopping-cart-2-line"></i>
//                             </button>
//                             <button class="add-to-wishlist">
//                                 <i class="ri-heart-line"></i>
//                             </button>
//                         </div>
//                     </div>
//                     </div>
//                 `;
//         productsContainer.insertAdjacentHTML("beforeend", productHTML);
//       });
//     } else {
//       productsContainer.innerHTML =
//         "<p>No products found in this category.</p>";
//     }
//   } catch (error) {
//     console.error("Error fetching category products:", error.message);
//     const productsContainer = document.getElementById("products-container");
//     if (productsContainer) {
//       productsContainer.innerHTML =
//         "<p>Error loading products. Please try again later.</p>";
//     }
//   }
// };

// // Fetch and display products when the page is loaded
// window.addEventListener("load", () => {
//   const category = new URLSearchParams(window.location.search).get("category");
//   console.log(category);
//   fetchCategoryProducts(category);
//   // if (category) {
//   //     fetchCategoryProducts(category);
//   // } else {
//   //     console.error("No category found in the URL.");
//   // }
// });

const fetchCategoryProducts = async (category) => {
  const productsContainer = document.getElementById("products-container");
  const paginationContainer = document.getElementById("pagination-container");

  const itemsPerPage = 8; // Number of items per page
  let currentPage = 1; // Default to the first page

  try {
    // Show a loading message
    if (productsContainer) {
      productsContainer.innerHTML = "<p>Loading products...</p>";
    }

    // Fetch products from the API
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products for category ${category}. Status: ${response.status}`
      );
    }

    const products = await response.json(); // This contains the products object
    const totalProducts = products.products.length;

    if (totalProducts === 0) {
      productsContainer.innerHTML =
        "<p>No products found in this category.</p>";
      return;
    }

    // Function to render a specific page
    const renderPage = (page) => {
      currentPage = page;

      // Calculate start and end indexes
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const productsToDisplay = products.products.slice(startIndex, endIndex);

      // Clear previous products and render new ones
      productsContainer.innerHTML = "";
      productsToDisplay.forEach((product) => {
        const productHTML = `
            <div class="product">
              <div class="product-card">
                <div class="popular-product-img"> 
                  <img src="${product.images[0]}" alt="${
          product.title
        }" class="product-image">
                </div>
                <div class="product-info">
                  <h3 class="product-name"> 
                    <a class="shorten" href="product-details.html?id=${
                      product.id
                    }">${product.title}</a>
                  </h3>
                  <p class="product-price">$${product.price.toFixed(2)}</p>
                  <p class="product-availability">${
                    product.availabilityStatus || "In Stock"
                  }</p>
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
        productsContainer.insertAdjacentHTML("beforeend", productHTML);
      });
    };

    // Function to render pagination buttons
    const renderPagination = () => {
      const totalPages = Math.ceil(totalProducts / itemsPerPage);

      // Clear previous pagination buttons
      paginationContainer.innerHTML = "";

      // Create buttons dynamically
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = i === currentPage ? "active" : "";
        button.addEventListener("click", () => {
          renderPage(i);
          renderPagination();
        });
        paginationContainer.appendChild(button);
      }
    };

    // Initial rendering
    renderPage(currentPage);
    renderPagination();
  } catch (error) {
    console.error("Error fetching category products:", error.message);
    if (productsContainer) {
      productsContainer.innerHTML =
        "<p>Error loading products. Please try again later.</p>";
    }
  }
};

// Fetch and display products when the page is loaded
window.addEventListener("load", () => {
  const category = new URLSearchParams(window.location.search).get("category");
  if (category) {
    fetchCategoryProducts(category);
  } else {
    console.error("No category found in the URL.");
  }
});
