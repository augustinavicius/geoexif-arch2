// Navbar Control
module.exports.navBarControl = () => {
    let navbar = document.getElementById('navbar');
    let navbarControlIcon = document.getElementById('navbarControlIcon');

    if (navbar.style.left == 'calc(-33.3333vw)') { // Open Navbar
        navbar.style.left = '0px';
        navbarControlIcon.classList.value = 'fa-solid fa-chevron-left';
    } else { // Close Navbar
        navbar.style.left = 'calc(-33.3333vw)';
        navbarControlIcon.classList.value = 'fa-solid fa-chevron-right';
    }
}