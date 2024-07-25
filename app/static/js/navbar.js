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
    if (menu_opener) {
        side_nav.style.width = '200px';
        content.style.margin = '200px';
    } else {
        side_nav.style.width = '65px';
        content.style.margin = '65px';
    }
    menu_opener = !menu_opener;
}
