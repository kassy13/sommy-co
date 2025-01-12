// // Initialize Appwrite client
// const client = new Appwrite.Client()
//   .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
//   .setProject("675da000000fd4f21140"); // Your project ID

// // Initialize Appwrite account service
// const account = new Appwrite.Account(client);

// // Handle form submission
// const signupForm = document.getElementById("signupForm");

// signupForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the default form submission

//   // Get email and password values from the form
//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   // Form validation
//   if (!name || !email || !password) {
//     Toastify({
//       text: "Please fill in all fields.",
//       backgroundColor: "red",
//       duration: 3000,
//     }).showToast();
//     return;
//   }

//   if (password.length < 6) {
//     Toastify({
//       text: "Password must be at least 6 characters long.",
//       backgroundColor: "red",
//       duration: 3000,
//     }).showToast();
//     return;
//   }

//   // Call Appwrite's account.create method to create a new user
//   account
//     .create(Appwrite.ID.unique(), email, password, name)
//     .then(function (response) {
//       console.log("User created successfully:", response);

//       // Show a success message using Toastify
//       Toastify({
//         text: "Account created successfully! Redirecting to login...",
//         backgroundColor: "green", // Toastify success color
//         duration: 3000, // Duration of the toast
//       }).showToast();

//       // Wait for the toast to show, then redirect to login after 3 seconds
//       setTimeout(function () {
//         window.location.href = "signin.html"; // Redirect to login page
//       }, 3000); // Delay in milliseconds (same as toast duration)
//     })
//     .catch(function (error) {
//       console.log("Error creating user:", error);

//       // Show error message using Toastify
//       Toastify({
//         text: "Error: " + error.message,
//         backgroundColor: "red", // Toastify error color
//         duration: 3000, // Duration of the toast
//       }).showToast();
//     });
// });

// Initialize Appwrite client
const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("675da000000fd4f21140"); 

// Initialize Appwrite account service
const account = new Appwrite.Account(client);

// Handle form submission
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get name, email, and password values from the form
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Form validation
  if (!name || !email || !password) {
    Toastify({
      text: "Please fill in all fields.",
      backgroundColor: "red",
      duration: 3000,
    }).showToast();
    return;
  }

  if (password.length < 6) {
    Toastify({
      text: "Password must be at least 6 characters long.",
      backgroundColor: "red",
      duration: 3000,
    }).showToast();
    return;
  }

  try {
    // Step 1: Create a new user
    const userResponse = await account.create(
      Appwrite.ID.unique(),
      email,
      password
    );
    console.log("User created successfully:", userResponse);

    // Step 2: Log the user in to get an authenticated session
    await account.createEmailPasswordSession(email, password);
    console.log("User logged in successfully.");

    // Step 3: Update the user's name
    await account.updateName(name);
    console.log("Name updated successfully.");

    // Show a success message using Toastify
    Toastify({
      text: "Account created successfully! Redirecting...",
      backgroundColor: "green",
      duration: 3000,
    }).showToast();

    // Redirect the user to a dashboard or home page
    setTimeout(() => {
      window.location.href = "index.html"; // Change to your desired page
    }, 3000);
  } catch (error) {
    console.log("Error creating user:", error);

    // Show error message using Toastify
    Toastify({
      text: "Error: " + error.message,
      backgroundColor: "red",
      duration: 3000,
    }).showToast();
  }
});
