function showLoader() {
  document.getElementById("preloder").style.display = "block";
  document.getElementById("gen-container").style.display = "none";
}

function hideLoader() {
  document.getElementById("preloder").style.display = "none";
  document.getElementById("gen-container").style.display = "block";
}

const client = new Appwrite.Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("675da000000fd4f21140");

const account = new Appwrite.Account(client);
const database = new Appwrite.Databases(client);

function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "success" ? "green" : "red",
  }).showToast();
}

async function fetchUserSession() {
  try {
    const session = await account.get();
    sessionStorage.setItem("currentUser", JSON.stringify({ id: session.$id }));
    return session.$id;
  } catch (error) {
    console.error(error);
    window.location.href = "/signin";
  }
}

async function fetchCartItems() {
  showLoader(); // Show loader when request starts

  try {
    // Get the user ID from session storage
    const userId = JSON.parse(sessionStorage.getItem("currentUser"))?.id;

    console.log("User ID:", userId);
    const database = new Appwrite.Databases(client); // Initialize Appwrite database client

    // Fetch documents from the 'orders' collection filtered by 'userId'
    const response = await database.listDocuments(
      "orders", // Your database ID
      "67882e540004d6edc4d4", // Your collection ID
      [Appwrite.Query.equal("userId", userId)] // Filter by the userId
    );

    console.log("Fetched cart response:", response);

    // Get the cart items from the response
    const cartItems = response.documents;

    console.log("Cart Items:", cartItems);

    return cartItems; // Return the cart items matching the logged-in user
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return []; // Return an empty array in case of an error
  } finally {
    hideLoader(); // Hide loader when request ends
  }
}

async function displayCartItems() {
  await fetchUserSession();
  const cartItems = await fetchCartItems();

  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let totalAmount = 0;

  cartItems.forEach((item) => {
    totalAmount += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
                       
                        <img src="${item.imageUrl}" alt="${item.productName}">
                        <div class="cart-item-details">
                            <h4>${item.productName}</h4>
                            <p>Price: $${item.price}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <div class="cart-item-actions">
                            <button data-id="${item.$id}" class="delete-item">Delete</button>
                    `;

    cartContainer.appendChild(itemDiv);
  });

  document.getElementById(
    "total-amount"
  ).innerText = `Total: $${totalAmount.toFixed(2)}`;

  document.querySelectorAll(".delete-item").forEach((button) => {
    button.addEventListener("click", handleDeleteClick);
  });
}

// Handle the delete button click
function handleDeleteClick(event) {
  const itemId = event.target.dataset.id; // This is the correct way to get the item ID from the button
  const itemName = event.target
    .closest(".cart-item")
    .querySelector("h4").innerText;

  // Show the modal
  const modal = document.getElementById("confirmation-modal");
  const itemNameElement = document.getElementById("modal-item-name");
  itemNameElement.innerText = itemName;

  // Show the modal
  modal.style.display = "flex";

  // Add event listener for confirmation and cancel buttons
  const confirmButton = document.getElementById("confirm-delete");
  const cancelButton = document.getElementById("cancel-delete");

  confirmButton.onclick = async () => {
    await deleteCartItem(itemId); // Pass the itemId directly to the delete function
    modal.style.display = "none"; // Close the modal
    displayCartItems(); // Re-render the cart after deletion
  };

  cancelButton.onclick = () => {
    modal.style.display = "none"; // Close the modal without any action
  };
}

// Function to delete the cart item (correctly use itemId)
async function deleteCartItem(itemId) {
  try {
    // Replace "your-database-id" and "your-collection-id" with your actual Appwrite database/collection IDs
    await database.deleteDocument("orders", "67882e540004d6edc4d4", itemId);
    showToast("Item deleted successfully!", "success");
    displayCartItems();
  } catch (error) {
    console.error(error);
    showToast("Failed to delete item.", "error");
  }
}

window.onclick = (event) => {
  const modal = document.getElementById("confirmation-modal");
  if (event.target === modal) {
    modal.style.display = "none"; // Close modal when clicked outside
  }
};

async function getCurrentUser() {
  try {
    const user = await account.get();
    return user.$id; // This is the Appwrite User ID
  } catch (error) {
    console.error("User not logged in or session expired:", error);
    return null;
  }
}

const functions = new Appwrite.Functions(client);
const appwriteFunctionId = "678b8ffa0037c3515336"; // Replace with your Appwrite Function ID

// Function to handle function execution on button click


async function triggerCheckout() {
  try {
    // Ensure cart items are displayed and total is calculated
    await displayCartItems();

    // Extract dynamic values
    const totalAmount = getTotalAmount();
    const productNames = getProductNames();

    console.log("Total Amount:", totalAmount);
    console.log("Product Names:", productNames);

    // Validate total amount
    if (isNaN(totalAmount) || totalAmount <= 0) {
      throw new Error("Invalid total amount");
    }

    // Trigger the Appwrite function
    const response = await functions.createExecution(
      appwriteFunctionId,
      JSON.stringify({
        path: "/checkout",
        failureUrl: "http://127.0.0.1:5501/success.html",
        successUrl: "http://127.0.0.1:5501/fail.html",
        totalAmount: totalAmount,
        productName: productNames,
      }),
      false,
      "/checkout",
      "POST",
      {
        "Content-Type": "application/json",
      }
    );

    // Log the response status and headers
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.responseHeaders);

    // Use the higher-order function `find()` to get the location header
    if (response.responseStatusCode === 303) {
      const locationHeader = response.responseHeaders.find(
        (header) => header.name.toLowerCase() === "location"
      );

      if (locationHeader) {
        console.log("Redirecting to:", locationHeader.value);

        // Manually set window location to the redirect URL
        // window.location.href = locationHeader.value;
        window.open(locationHeader.value, "_blank");
      } else {
        console.error("Location header not found in response.");
      }
    } else {
      console.log("Response is not a redirect. Status code:", response.status);
      if (response.responseBody) {
        console.log("Response Body:", response.responseBody);
      }
    }
  } catch (error) {
    console.error("Error triggering checkout:", error);
  }
}

// Function to get the total amount (after cart items have been displayed)
function getTotalAmount() {
  const totalElement = document.getElementById("total-amount");

  if (!totalElement) {
    console.error("Total amount element not found!");
    return 0;
  }

  // Extract and clean the amount properly
  let totalAmountText = totalElement.innerText.trim().replace(/[^\d.]/g, "");
  let totalAmount = parseFloat(totalAmountText);

  if (isNaN(totalAmount) || totalAmount <= 0) {
    console.error("Invalid total amount detected:", totalAmount);
    return 0;
  }

  console.log("Captured Total Amount:", totalAmount);
  console.log(typeof totalAmount);

  return totalAmount;
}

// Function to get the product names (after cart items have been displayed)
function getProductNames() {
  const cartItems = document.querySelectorAll(".cart-item");
  const names = [];
  cartItems.forEach((item) => {
    const name = item.querySelector("h4").innerText;
    console.log("getProductNames() - Captured Product Name:", name); // Log each captured product name
    names.push(name);
  });
  const productNames = names.join(", "); // Join names into a string for simplicity
  console.log("getProductNames() - Final Product Names:", productNames); // Log the final product names string
  return productNames;
}

// Function to get the total amount (after cart items have been displayed)
function getTotalAmount() {
  const totalElement = document.getElementById("total-amount");
  return totalElement
    ? parseFloat(totalElement.innerText.replace("Total: $", ""))
    : 0;
}

// Function to get the product names (after cart items have been displayed)
function getProductNames() {
  const cartItems = document.querySelectorAll(".cart-item");
  const names = [];
  cartItems.forEach((item) => {
    const name = item.querySelector("h4").innerText;
    console.log("getProductNames() - Captured Product Name:", name);
    names.push(name);
  });
  return names.join(", "); // Join names into a string for simplicity
}

// Add event listener to your Checkout button
document
  .getElementById("checkout-button")
  .addEventListener("click", triggerCheckout);

// Add function to save order in database
async function saveOrderToDatabase(totalAmount, status) {
  const userId = JSON.parse(sessionStorage.getItem("currentUser"))?.id;
  const cartItems = await fetchCartItems();
  try {
    const orderData = {
      userId,
      items: cartItems.map((item) => ({
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      status,
      date: new Date().toISOString(),
    };
    await database.createDocument(
      "orders",
      "678e2d580003253432dd",
      Appwrite.ID.unique(),
      orderData
    );
    showToast("Order saved in database!", "success");
  } catch (error) {
    console.error("Error saving order:", error);
    showToast("Error saving order in database!", "error");
  }
}

displayCartItems();
