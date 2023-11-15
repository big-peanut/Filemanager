// Getting the login form element by its ID
const loginForm = document.getElementById("loginform");

// Function to handle the login process
async function login(email, password) {
  try {
    // Creating a user object with email and password
    const user = {
      email,
      password,
    };

    // Sending a POST request to the login endpoint
    const response = await axios.post("http://localhost:3000/user/login", user);

    // Checking if the response contains a message (successful login)
    if (response.data.message) {
      alert("User login successful");
      // Storing the token received in the response in local storage
      localStorage.setItem("token", response.data.token);
      // Redirecting to the manager.html page upon successful login
      window.location.href = "manager.html";
    } else {
      // If login failed, display an error message in the form
      const p = document.createElement("p");
      p.textContent =
        "Login failed. Incorrect password or email not registered.";
      loginForm.appendChild(p);
    }
  } catch (err) {
    // Handling different types of errors
    if (err.response && err.response.data) {
      // If the error is from the server response, display the server error message
      const p = document.createElement("p");
      p.textContent = err.response.data.error;
      loginForm.appendChild(p);
    } else {
      // If it's another type of error, display the error message
      const p = document.createElement("p");
      p.textContent = err.message;
      loginForm.appendChild(p);
    }
  }
}

// Event listener for the login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Getting email and password values from the form
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Calling the login function with email and password parameters
  login(email, password);

  // Clearing the email and password fields after login attempt
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});
