// show a message with a type of the input
function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;
  // update the class for the input
  input.className = type ? "success" : "error";
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

function validatePassword(input, requiredMsg, invalidMsg) {
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const confirmPassword = input.value.trim();
  if (!passwordRegex.test(confirmPassword)) {
    return showError(input, invalidMsg);
  }
  return true;
}
function validateEmail(input, requiredMsg, invalidMsg) {
  // check if the value is not empty
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  // validate email format
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = input.value.trim();
  if (!emailRegex.test(email)) {
    return showError(input, invalidMsg);
  }
  return true;
}

// toggle password
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#confirmPassword");

togglePassword.addEventListener("click", function () {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // toggle the icon
  this.classList.toggle("bi-eye");
});

const form = document.querySelector("#login");

const NAME_REQUIRED = "Please enter your password";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const CONFIRM_PASSWORD = "Please enter a correct password address format";

form.addEventListener("submit", function (event) {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  // stop form submission
  event.preventDefault();
  // validate the form
  let emailValid = validateEmail(
    form.elements["email"],
    EMAIL_REQUIRED,
    EMAIL_INVALID
  );
  let passwordValid = validatePassword(
    form.elements["password"],
    NAME_REQUIRED,
    CONFIRM_PASSWORD
  );
  let confirmPasswordValid = validatePassword(
    form.elements["confirmPassword"],
    NAME_REQUIRED,
    CONFIRM_PASSWORD
  );
  // if valid, submit the form.
  if (passwordValid && emailValid && confirmPasswordValid) {
    if (password === confirmPassword) {
      if (localStorage) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }
      alert("Đăng kí thành công");
      document.getElementById("login").reset();
      window.location.href = "login.html";
    } else {
      document.getElementById("title_Confirm").innerHTML =
        "Password is not correct";
    }
  }
});
