// document.addEventListener("DOMContentLoaded", async () => {
//   const headerPlaceholder = document.getElementById("header-placeholder");

//   try {
//     // Fetch the header HTML file
//     const response = await fetch("header.html");
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Get the text content from the response
//     const html = await response.text();

//     // Inject the header HTML into the placeholder div
//     headerPlaceholder.innerHTML = html;
//   } catch (error) {
//     console.error("Error loading header:", error);
//   }
// });

// Initialize Appwrite client
const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("675da000000fd4f21140"); // Your project ID

// Initialize Appwrite account service
export const account = new Appwrite.Account(client);

document.addEventListener("DOMContentLoaded", async () => {
  const headerPlaceholder = document.getElementById("header-placeholder");

  try {
    // Fetch and inject the header HTML
    const response = await fetch("header.html");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const html = await response.text();
    headerPlaceholder.innerHTML = html;

    // Now that the header is loaded, initialize user authentication
    await initAuth();
  } catch (error) {
    console.error("Error loading header:", error);
  }
});

async function initAuth() {
  try {
    // Select the DOM elements AFTER the header is injected
    const loginLink = document.getElementById("login-link");
    const logoutBtn = document.getElementById("logout-btn");
    const userInfo = document.getElementById("user-info");

    // Check if a user is logged in
    const user = await account.get();
    console.log("user", user);
    sessionStorage.setItem("currentUser", user.$id);
    const userId = sessionStorage.getItem("currentUser");

    // If a user is logged in, update the UI
    userInfo.innerHTML = `Welcome, ${user.name}`;
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
    const cartBadge = document.getElementById("cart-badge");

    // Fetch and display cart items
    await fetchCartItems(userId, cartBadge);

    // Handle logout
    logoutBtn.addEventListener("click", async () => {
      await account.deleteSession("current");
      alert("You have been logged out.");
      // location.reload();
      window.location.href = "index.html";
    });
  } catch {
    // If no user is logged in, show the login link
    console.log("No user is logged in.");
  }
}

// get items from the cart
// Function to fetch cart items from the database
async function fetchCartItems(userId, cartBadge) {
  try {
    const database = new Appwrite.Databases(client);
    const response = await database.listDocuments(
      "orders", // Your database ID
      "67882e540004d6edc4d4", // Your collection ID
      [Appwrite.Query.equal("userId", userId)]
    );
    console.log(response);
    const cartItems = response.documents;

    // Update the cart badge with the number of items in the cart
    cartBadge.innerText = cartItems.length;

    // Optionally, display the cart items (you can modify this to suit your UI)
    console.log("Cart Items:", cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}
