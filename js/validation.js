// Author: Chase Griffin
// Project 5
// Description: Implements field validation with dynamic checks for required fields, formats, and state validation.

function initValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => validateField(input.id));
    });
}

function validateField(fieldId) {
    const fieldSelector = `#${fieldId}`;
    if (fieldId === "name") checkRequired(fieldSelector, "Name is required.");
    if (fieldId === "email") checkFormat(fieldSelector, "Invalid email format.", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (fieldId === "phone") checkFormat(fieldSelector, "Invalid phone format.", /^\d{10}$/);
    if (fieldId === "state") validateState(fieldSelector, "Invalid state abbreviation.");
}

function validateForm() {
    const isNameValid = checkRequired("#name", "Name is required.");
    const isEmailValid = checkFormat("#email", "Invalid email format.", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const isPhoneValid = checkFormat("#phone", "Invalid phone format.", /^\d{10}$/);
    const isStateValid = validateState("#state", "Invalid state abbreviation.");
    return isNameValid && isEmailValid && isPhoneValid && isStateValid;
}

function checkRequired(fieldId, requiredMessage) {
    const field = document.querySelector(fieldId);
    if (!field.value.trim()) {
        setElementValidity(fieldId, false, requiredMessage);
        return false;
    }
    setElementValidity(fieldId, true, "");
    return true;
}

function checkFormat(fieldId, badFormatMessage, regex) {
    const field = document.querySelector(fieldId);
    if (!regex.test(field.value.trim())) {
        setElementValidity(fieldId, false, badFormatMessage);
        return false;
    }
    setElementValidity(fieldId, true, "");
    return true;
}

function validateState(fieldId, invalidMessage) {
    const validStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA"];
    const field = document.querySelector(fieldId);
    if (!validStates.includes(field.value.trim().toUpperCase())) {
        setElementValidity(fieldId, false, invalidMessage);
        return false;
    }
    setElementValidity(fieldId, true, "");
    return true;
}

function setElementValidity(id, valid, message) {
    const field = document.querySelector(id);
    const errorMessage = field.nextElementSibling;
    if (valid) {
        field.style.borderColor = "green";
        errorMessage.textContent = "";
    } else {
        field.style.borderColor = "red";
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
    }
}
