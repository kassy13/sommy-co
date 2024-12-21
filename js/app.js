// Initialize Appwrite client
const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("675da000000fd4f21140"); // Your project ID

// Initialize Appwrite account service
const account = new Appwrite.Account(client);

// Handle form submission
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get email and password values from the form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Call Appwrite's account.create method to create a new user
  account
    .create(Appwrite.ID.unique(), email, password)
    .then(function (response) {
      console.log("User created successfully:", response);

      // Show a success message using Toastify
      Toastify({
        text: "Account created successfully! Redirecting to login...",
        backgroundColor: "green", // Toastify success color
        duration: 3000, // Duration of the toast
      }).showToast();

      // Wait for the toast to show, then redirect to login after 3 seconds
      setTimeout(function () {
        window.location.href = "signin.html"; // Redirect to login page
      }, 3000); // Delay in milliseconds (same as toast duration)
    })
    .catch(function (error) {
      console.log("Error creating user:", error);

      // Show error message using Toastify
      Toastify({
        text: "Error: " + error.message,
        backgroundColor: "red", // Toastify error color
        duration: 3000, // Duration of the toast
      }).showToast();
    });
});
