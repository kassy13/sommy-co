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

    // Add event listener for the Add to Cart button
    const addToCartButton = document.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => addToCart(product));
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
                            <input type="number" id="quantity" value=${
                              product.minimumOrderQuantity
                            }>
                        </div>
                       <div class="total-price">Total: $${product.price.toFixed(
                         2
                       )}</div>
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
  // Handle quantity input change
  const quantityInput = document.getElementById("quantity");
  const totalPriceElement = document.querySelector(".total-price");

  // Update total price based on quantity
  quantityInput.addEventListener("input", (event) => {
    let quantity = parseInt(event.target.value, 10);
    if (isNaN(quantity) || quantity < product.minimumOrderQuantity) {
      quantity = product.minimumOrderQuantity;
    }
    event.target.value = quantity;

    const totalPrice = quantity * product.price;
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  });
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

// Initialize Appwrite Client
const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("675da000000fd4f21140"); // Your project ID

// Function to add product to cart
const currentUserId = sessionStorage.getItem("currentUser");
console.log("newuser", currentUserId);
async function addToCart(product) {
  const database = new Appwrite.Databases(client);
  try {
    // Get the current user ID (assuming you have a logged-in user session)
    const userId = currentUserId; // Replace with actual user ID from Appwrite session

    if (!userId) {
      alert("No user logged in.");
      return;
    }
    // Get the selected quantity
    const quantity = parseInt(document.getElementById("quantity").value, 10);

    // Prepare the data to save
    const cartData = {
      userId,
      productId: String(product.id),
      productName: product.title,
      price: product.price,
      quantity,
      imageUrl: product.images[0] || "https://via.placeholder.com/600",
    };
    console.log(cartData);

    // Save the cart item to the database
    const response = await database.createDocument(
      "6777b3ad001b214a23a2",
      "6777b3f800054b43ad72", // Replace with your collection ID
      Appwrite.ID.unique(), // Unique document ID
      cartData
    );

    console.log("Product added to cart:", response);
    Toastify({
      text: "Product added to cart successfully!",
      backgroundColor: "green",
      duration: 3000,
    }).showToast();
    setTimeout(() => {
      window.location.href = "/cart.html";
    }, 3000);
    return;
  } catch (error) {
    console.error("Error adding to cart:", error);
    Toastify({
      text: "Failed to add product to cart.!",
      backgroundColor: "red",
      duration: 3000,
    }).showToast();
  }
}
