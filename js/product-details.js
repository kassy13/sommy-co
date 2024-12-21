// console.log("hiiii");

// // Extract the product ID from the URL parameters
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");
// console.log("product id", productId);

// // Fetch product details from the API
// async function fetchProduct(productId) {
//   try {
//     const response = await fetch(`https://dummyjson.com/products/${productId}`);
//     if (!response.ok) throw new Error("Failed to fetch product details");

//     const product = await response.json();
//     console.log("product", product);
//     // Render the product details
//     renderProduct(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//   }
// }

// // Render product details into the HTML
// function renderProduct(product) {
//   const container = document.getElementById("productContainer");

//   container.innerHTML = `
//         <div class="item-view">
//             <!-- Image Section -->
//             <div class="image-section">
//                 <img src="${
//                   product.images[0] || "https://via.placeholder.com/600"
//                 }" alt="${product.title}">
//             </div>

//             <!-- Details Section -->
//             <div class="item-details">
//                 <h1>${product.title}</h1>
//                 <div class="stars">${generateStars(product.rating)}</div>
//                 <p>${product.description}</p>
//                 <div class="price">$${product.price.toFixed(2)}</div>
//                 <div class="availability">Availability: <strong>${
//                   product.stock > 0 ? "In Stock" : "Out of Stock"
//                 }</strong></div>
//                 <div class="category">Category: <strong>${
//                   product.category
//                 }</strong></div>
//                 <div class="quantity">
//                     <label for="quantity">Quantity:</label>
//                     <input type="number" id="quantity" min="1" value="1">
//                 </div>
//                 <div class="actions">
//                     <button class="add-to-cart">Add to Cart</button>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// // Generate stars for the rating
// function generateStars(rating) {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//   const emptyStars = 5 - fullStars - halfStar;

//   return "&#9733;".repeat(fullStars) + "&#9734;".repeat(emptyStars);
// }

// // Fetch and display the product
// if (productId) {
//   fetchProduct(productId);
// } else {
//   console.error("No product ID provided in the URL");
// }

// Extract the product ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Fetch product details from the API
async function fetchProduct(productId) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");

    const product = await response.json();
    console.log("proucts", product);
    // Render the product details
    renderProduct(product);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

// Render product details into the HTML
function renderProduct(product) {
  const container = document.getElementById("productContainer");

  container.innerHTML = `
                <div class="item-view">
                    <!-- Image Section -->
                    <div class="image-section">
                        <img src="${
                          product.images[0] || "https://via.placeholder.com/600"
                        }" alt="${product.title}">
                    </div>

                    <!-- Details Section -->
                    <div class="item-details">
                        <h1>${product.title}</h1>
                        <div class="stars">${generateStars(
                          product.rating
                        )}</div>
                        <p>${product.description}</p>
                        <div class="price">$${product.price.toFixed(2)}</div>
                        <div class="availability">Availability: <strong>${
                          product.availabilityStatus
                        }</strong></div>
                        <div class="category">Category: <strong>${
                          product.category
                        }</strong></div>
                        <div class="details">
                            <p><strong>Brand:</strong> ${product.brand}</p>
                            <p><strong>SKU:</strong> ${product.sku}</p>
                            <p><strong>Weight:</strong> ${product.weight}g</p>
                            <p><strong>Dimensions:</strong> ${
                              product.dimensions.width
                            } x ${product.dimensions.height} x ${
    product.dimensions.depth
  } cm</p>
                            <p><strong>Warranty:</strong> ${
                              product.warrantyInformation
                            }</p>
                            <p><strong>Shipping:</strong> ${
                              product.shippingInformation
                            }</p>
                            <p><strong>Return Policy:</strong> ${
                              product.returnPolicy
                            }</p>
                            <p><strong>Minimum Order Quantity:</strong> ${
                              product.minimumOrderQuantity
                            }</p>
                        </div>
                        <div class="quantity">
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" min=${
                              product.minimumOrderQuantity
                            } value="1">
                        </div>
                        <div class="actions">
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>

                <!-- Customer Reviews Section -->
                <div class="reviews-section">
                    <h2>Customer Reviews</h2>
                    ${product.reviews
                      .map(
                        (review) => `
                        <div class="review">
                            <div class="author">${review.reviewerName}</div>
                            <div class="rating">${generateStars(
                              review.rating
                            )}</div>
                            <p>${review.comment}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
}

// Generate stars for the rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return "&#9733;".repeat(fullStars) + "&#9734;".repeat(emptyStars);
}

// Fetch and display the product
if (productId) {
  fetchProduct(productId);
} else {
  console.error("No product ID provided in the URL");
}
