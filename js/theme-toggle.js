// Author: [Your Name]
// Project: Visitor Form with Validation and Page Management
// Description: Implements form validation, dynamic validation, theme toggling, 
//              page switching, and visitor form visibility functionality.

document.addEventListener("DOMContentLoaded", () => {
    // Initialize form validation
    initValidation("#myform");

    // Event listener to toggle visitor form visibility
    const logVisitMenu = document.querySelector("#logVisitMenu"); // Menu item ID
    logVisitMenu.addEventListener("click", () => toggleSection("#visitorFormSection"));

    // Hide form on submission if valid
    const form = document.querySelector("#myform");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default submission
        const isValid = validateForm();
        if (isValid) {
            alert("Thank you for your submission!");
            toggleSection("#visitorFormSection"); // Hide the form
        }
    });

    // Attach dynamic field validation listeners
    document.querySelectorAll("#myform input").forEach((input) => {
        input.addEventListener("input", () => validateField(input.id));
    });

    // Attach theme toggle functionality
    document.querySelector('.toggle-button').addEventListener('click', toggleTheme);
});

// ===============================
// Section Toggling
// ===============================

// Function to toggle the visibility of a section
function toggleSection(sectionId) {
    const section = document.querySelector(sectionId);
    section.classList.toggle("hidden");
}

// ===============================
// Form Validation
// ===============================

// Initialize validation by setting up dynamic checks
function initValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => validateField(input.id));
    });
}

// Validate individual fields dynamically
function validateField(fieldId) {
    const fieldSelector = `#${fieldId}`;
    if (fieldId === "name") checkRequired(fieldSelector, "Name is required.");
    if (fieldId === "email") checkFormat(fieldSelector, "Invalid email format.", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (fieldId === "phone") checkFormat(fieldSelector, "Invalid phone format.", /^\d{10}$/);
    if (fieldId === "state") validateState(fieldSelector, "Invalid state abbreviation.");
}

// Validate all fields on form submission
function validateForm() {
    const isNameValid = checkRequired("#name", "Name is required.");
    const isEmailValid = checkFormat("#email", "Invalid email format.", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const isPhoneValid = checkFormat("#phone", "Invalid phone format.", /^\d{10}$/);
    const isStateValid = validateState("#state", "Invalid state abbreviation.");
    return isNameValid && isEmailValid && isPhoneValid && isStateValid;
}

// Check if a required field is filled
function checkRequired(fieldId, requiredMessage) {
    const field = document.querySelector(fieldId);
    if (!field.value.trim()) {
        setElementValidity(fieldId, false, requiredMessage);
        return false;
    }
    setElementValidity(fieldId, true, "");
    return true;
}

// Validate field format with a regex
function checkFormat(fieldId, badFormatMessage, regex) {
    const field = document.querySelector(fieldId);
    if (!regex.test(field.value.trim())) {
        setElementValidity(fieldId, false, badFormatMessage);
        return false;
    }
    setElementValidity(fieldId, true, "");
    return true;
}

// Validate state abbreviation
function validateState(fieldId, invalidMessage) {
    const validStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA"]; // Add all valid states
    const field = document.querySelector(fieldId);
    if (!validStates.includes(field.value.trim().toUpperCase())) {
        setElementValidity(fieldId, false, invalidMessage);
        return false;
    }
    setElementValidity(fieldId, true, "");
    return true;
}

// Display error messages and style inputs
function setElementValidity(id, valid, message) {
    const field = document.querySelector(id);
    const errorMessage = field.nextElementSibling; // Assuming error messages are placed right after the field
    if (valid) {
        field.style.borderColor = "green";
        errorMessage.textContent = "";
    } else {
        field.style.borderColor = "red";
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
    }
}

// ===============================
// Theme Toggling
// ===============================

// Function to toggle themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    // Optionally update button text
    const button = document.querySelector('.toggle-button');
    button.innerText = body.classList.contains('dark-theme') 
        ? 'Switch to Light Theme' 
        : 'Switch to Dark Theme';
}

// ===============================
// Initial Setup
// ===============================

// Set the default theme to light
document.body.classList.add("light-theme");
