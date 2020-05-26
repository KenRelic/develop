// menu icon effect
let menuIcon = document.getElementById('menu-icon');
let closeMenuBtn = document.getElementById('close-menu-btn');
let menuWrapper = document.getElementById('menu-wrapper');
let menuWrapperShadow = document.getElementById('menu-wrapper-shadow');

menuIcon.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);


function openMenu() {
    setTimeout(() => {
        menuWrapperShadow.style.display = 'block';
        //PREVENT USER SCROLL
        preventUserScroll();       
    }, 100);
    closeMenuBtn.style.display = 'block';
    return menuWrapper.style.clipPath = "circle(200% at 100% 0%)";
};


let menuListItems = document.getElementById('menu').children;
let headerLogo = document.getElementById('header-logo');
let nodeListItems = Array.from(menuListItems);
//Add close event to all menu items
nodeListItems.forEach(listItem => listItem.addEventListener('click', closeMenu));
//Add close event to the header logo 
headerLogo.addEventListener('click', closeMenu);

function closeMenu() {
    setTimeout(() => {
        menuWrapperShadow.style.display = 'none';
        allowUserScroll();
    }, 200);
    closeMenuBtn.style.display = 'none';
    return menuWrapper.style.clipPath = "circle(0% at 100% 0%)";
}

function preventUserScroll() {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
}

function allowUserScroll() {
    document.body.style.height = 'unset';
    document.body.style.overflow = 'unset';
}
