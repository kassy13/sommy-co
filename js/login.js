// Initialize Appwrite client
const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("675da000000fd4f21140"); // Your project ID

// Initialize Appwrite account service
export const account = new Appwrite.Account(client);

// Handle form submission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get email and password values from the form
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Call Appwrite's account.createSession method to log the user in
  account
    .createEmailPasswordSession(email, password)
    .then(function (response) {
      console.log("User logged in successfully:", response);

      // Show a success message using Toastify
      Toastify({
        text: "Logged in successfully! Redirecting...",
        backgroundColor: "green", // Toastify success color
        duration: 3000, // Duration of the toast
      }).showToast();

      // Wait for the toast to show, then redirect to the home page or dashboard after 3 seconds
      setTimeout(function () {
        window.location.href = "index.html"; // Replace with your dashboard or homepage
      }, 3000); // Delay in milliseconds (same as toast duration)
    })
    .catch(function (error) {
      console.log("Error logging in:", error);

      // Show error message using Toastify
      Toastify({
        text: "Error: " + error.message,
        backgroundColor: "red", // Toastify error color
        duration: 3000, // Duration of the toast
      }).showToast();
    });
});
