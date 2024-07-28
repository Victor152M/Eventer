// Turns the hamburger menu into a X after pressing it and opens the menu
// from the left, and then undoing everything if pressed 2nd time

let icon_changer = true;
function iconChanger() {
    var menu_opener = document.getElementById("open");
    var menu_closer = document.getElementById("close");
    if (icon_changer) {
        menu_opener.style.display = 'none';
        menu_closer.style.display = 'flex'; 
    } else {
        menu_opener.style.display = 'flex';
        menu_closer.style.display = 'none'; 
    }
    icon_changer = !icon_changer;
}

let menu_opener = true;
function menuOpener() {
    var side_nav = document.getElementById("side__nav");
    var content = document.getElementById("content");
    var elements = document.getElementsByClassName("sidebar_elem");
    if (menu_opener) {
        side_nav.style.width = '150px';
        content.style.margin = '0 0 0 170px';
        side_nav.style.alignItems = 'start';
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.margin = '60px 0 0 20px';
            elements[i].style.flexDirection = 'row';

            var text = elements[i].querySelector('p');
            if (text) {
                text.style.fontSize = '20px';
                text.style.fontWeight = '600';
                text.style.margin = '0 0 0 20px';
            }
        }
    } else {
        side_nav.style.width = '65px';
        content.style.margin = '0 0 0 65px';
        side_nav.style.alignItems = 'center';
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.margin = '50px 0 0 0';
            elements[i].style.flexDirection = 'column';

            var text = elements[i].querySelector('p');
            if (text) {
                text.style.fontSize = '13px';
                text.style.fontWeight = '0';
                text.style.margin = '0 0 0 0';
            }
        }
    }
    menu_opener = !menu_opener;
}
