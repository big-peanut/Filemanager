// Get the signup form element
const signupForm = document.getElementById("signupform");

// Function to handle user signup
async function signUp(name, email, password) {
  try {
    // Create a user object with provided details
    let user = {
      name,
      email,
      password,
    };

    // Make a POST request to the server for user signup
    await axios.post("http://localhost:3000/user/signup", user);

    // Log success message and redirect to login page
    console.log("signup");
    alert("Sign Up Successful");
    window.location.href = "login.html";
  } catch (err) {
    // If an error occurs (email already registered), display an error message
    const p = document.createElement("p");
    p.textContent = "Email already registered, Please Login";
    signupForm.appendChild(p);
  }
}

// Event listener for the signup form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get user input values
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Call the signUp function with user details
  signUp(name, email, password);

  // Clear the input fields after signup attempt
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});
