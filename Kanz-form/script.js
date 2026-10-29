const form = document.querySelector("form");

const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");

const firstNameError = document.querySelector("#first-name-error");
const lastNameError = document.querySelector("#last-name-error");
const emailError = document.querySelector("#email-error");

const submitButton = document.querySelector("#submit-btn");
const successMessage = document.querySelector("#success-message");

firstNameError.style.color = "red";
lastNameError.style.color = "red";
emailError.style.color = "red";

// ===== شكل النافذة الصغيرة (أعلى الشاشة) =====
successMessage.style.position = "fixed";
successMessage.style.top = "20px";
successMessage.style.left = "50%";
successMessage.style.transform = "translateX(-50%)";
successMessage.style.padding = "12px 24px";
successMessage.style.borderRadius = "8px";
successMessage.style.color = "white";
successMessage.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
successMessage.style.zIndex = "1000";
successMessage.style.display = "none"; // مخفية في البداية

let hideTimer;

// ===== دالة تعرض النافذة =====
function showMessage(text, bgColor) {
    successMessage.textContent = text;
    successMessage.style.backgroundColor = bgColor;
    successMessage.style.display = "block";

    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
        successMessage.style.display = "none";
    }, 3500);
}

function checkName(input, errorBox, fieldName) {
    if (input.value.trim() === "") {
        errorBox.textContent = "Please enter your " + fieldName + ".";
        return false;
    } else {
        errorBox.textContent = "";
        return true;
    }
}

function checkEmail() {
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        return false;
    } else if (!pattern.test(email)) {
        emailError.textContent = "Email format is not valid (example: name@mail.com).";
        return false;
    } else {
        emailError.textContent = "";
        return true;
    }
}

firstNameInput.addEventListener("blur", function () {
    checkName(firstNameInput, firstNameError, "first name");
});
firstNameInput.addEventListener("input", function () {
    checkName(firstNameInput, firstNameError, "first name");
});

lastNameInput.addEventListener("blur", function () {
    checkName(lastNameInput, lastNameError, "last name");
});
lastNameInput.addEventListener("input", function () {
    checkName(lastNameInput, lastNameError, "last name");
});

emailInput.addEventListener("blur", checkEmail);
emailInput.addEventListener("input", checkEmail);

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const firstOk = checkName(firstNameInput, firstNameError, "first name");
    const lastOk = checkName(lastNameInput, lastNameError, "last name");
    const emailOk = checkEmail();

    if (firstOk && lastOk && emailOk && form.checkValidity()) {
        showMessage("Application Submitted Successfully", "green");
    } else {
        showMessage("Not sent: please complete the form correctly.", "red");

        if (!firstOk) {
            firstNameInput.focus();
        } else if (!lastOk) {
            lastNameInput.focus();
        } else if (!emailOk) {
            emailInput.focus();
        } else {
            form.reportValidity();
        }
    }
});
