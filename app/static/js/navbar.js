// Turns the hamburger menu into a X after pressing it and opens the menu
// from the left, and then undoing everything if pressed 2nd time
let icon_changer = true;
function iconChanger() {
    var desktop_menu_opener = document.getElementById("open");
    var menu_closer = document.getElementById("close");
    if (icon_changer) {
        desktop_menu_opener.style.display = 'none';
        menu_closer.style.display = 'flex'; 
    } else {
        desktop_menu_opener.style.display = 'flex';
        menu_closer.style.display = 'none'; 
    }
    icon_changer = !icon_changer;
}

let menu_opener = true;
function menuOpenerDesktop() {
    var side_nav = document.getElementById("side__nav");
    var content = document.getElementById("content");
    var elements = document.getElementsByClassName("sidebar_elem");
    if (menu_opener) {
        side_nav.style.width = '200px';
        content.style.margin = '0 0 0 210px';
        side_nav.style.alignItems = 'start';
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.margin = '50px 0 0 20px';
            elements[i].style.flexDirection = 'row';

            var text = elements[i].querySelector('p');
            if (text) {
                text.style.fontSize = '20px';
                text.style.fontWeight = '600';
                text.style.margin = '0 0 0 20px';
            }

            // When meeting the second button (that is supossed to be the "Post" one)
            // the text will change to "Post an event", this practice is not the best
            // because if we add another button in the side_menu before the post button,
            // the second button will always turn into "Post an event", even if it shouldn't.
            if (i == 1) {
                text.textContent = 'Postează un event';
            }
        }
    } else {
        side_nav.style.width = '65px';
        content.style.margin = '0 0 0 55px';
        side_nav.style.alignItems = 'center';
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.margin = '40px 0 0 0';
            elements[i].style.flexDirection = 'column';

            var text = elements[i].querySelector('p');
            if (text) {
                text.style.fontSize = '13px';
                text.style.fontWeight = '400';
                text.style.margin = '0 0 0 0';
            }

            if (i == 1) {
                text.textContent = 'Post';
            }
        }
    }
    menu_opener = !menu_opener;
}
let mobile_menu_opener = true;
function menuOpenerMobile() {
    var side_nav = document.getElementById("side__nav");
    var elements = document.getElementsByClassName("sidebar_elem");
    if (mobile_menu_opener) {
        side_nav.style.transform = 'translate(0)';
        side_nav.style.width = '90%';
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.margin = '50px 0 0 20px';
            elements[i].style.flexDirection = 'row';

            var text = elements[i].querySelector('p');
            if (text) {
                text.style.fontSize = '20px';
                text.style.fontWeight = '600';
                text.style.margin = '0 0 0 20px';
            }

            if (i == 1) {
                text.textContent = 'Post an event';
            }
        }
    } else {
        side_nav.style.transform = 'translate(-100%)';
    }
    mobile_menu_opener = !mobile_menu_opener;
}

document.addEventListener('DOMContentLoaded', function() {
    var side_nav = document.getElementById("side__nav");
    if (window.matchMedia("(min-width: 1000px)").matches) {
        side_nav.style.width = '65px;';
        side_nav.style.alignItems = 'center';
    } else {
        side_nav.style.transform = 'translate(-100%)'
        side_nav.style.width = '90%';
        side_nav.style.alignItems = 'start';
    }
});

function handleMenuToggle() {
    if (window.matchMedia("(min-width: 1000px)").matches) {
        menuOpenerDesktop();
    } else {
        menuOpenerMobile();
    }
}