// Main navigation
var navButton = document.getElementById('menu-icon');
var mainNav = document.querySelector('.nav-list');
var mTime;
// toggle mobile view of main nav
if (navButton) {
    navButton.addEventListener('click', toggleMainNav, false);
}
window.addEventListener('resize', setNavAsMobile, true);
window.addEventListener('load', setNavAsMobile, true);
function toggleMainNav() {
    var _this = this;
    _this.classList.toggle('active');
    mainNav.classList.toggle('nav-list--active');
}
function setNavAsMobile() {
    clearTimeout(mTime);
    mTime = setTimeout(function () {
        if (window.innerWidth < 748) {
            mainNav.classList.add('nav-list--mobile');
        }
        else {
            mainNav.classList.remove('nav-list--mobile');
        }
    }, 400);
}
