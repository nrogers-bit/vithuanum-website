function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    menu.classList.toggle("open");
    overlay.classList.toggle("open");
}


// Close the menu when pressing the Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        const menu = document.getElementById("side-menu");
        const overlay = document.getElementById("menu-overlay");

        menu.classList.remove("open");
        overlay.classList.remove("open");
    }
});
