// Author: Chase Griffin
// Project 5
// Description: Implements page switching and theme toggle functionality.

function toggleSection(sectionId) {
    const section = document.querySelector(sectionId);
    section.classList.toggle("hidden");
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    const button = document.querySelector(".toggle-button");
    button.innerText = body.classList.contains("dark-theme")
        ? "Switch to Light Theme"
        : "Switch to Dark Theme";
}
