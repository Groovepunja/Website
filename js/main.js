// Author: Chase Griffin
// Project 5
// Description: Initializes form validation, manages theme toggling, and handles form visibility.

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
        toggleButton.addEventListener('click', toggleMenu);
    } else {
        console.error('Toggle button not found.');
    }
});

    // Toggle visitor form visibility
    const logVisitMenu = document.querySelector("#logVisitMenu");
    logVisitMenu.addEventListener("click", () => toggleSection("#visitorFormSection"));

    // Hide form after valid submission
    const form = document.querySelector("#myform");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert("Thank you for your submission!");
            toggleSection("#visitorFormSection");
        }
    });

    // Attach theme toggle functionality
    document.querySelector(".toggle-button").addEventListener("click", toggleTheme);
