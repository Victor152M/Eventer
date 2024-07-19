// Turns the hamburger menu into a X after pressing it and opens the menu
// from the left, and then undoing everything if pressed 2nd time
let changer = true;
function menuDictating() {
    var menu_active = document.getElementById("menu__body"); 
    var menu_opener = document.getElementById("menu__opener");
    var menu_closer = document.getElementById("menu__closer");
    if (changer) {
        menu_active.style.transform = 'translate(0)';
        menu_opener.style.display = 'none';
        menu_closer.style.display = 'flex';
    } else {
        menu_active.style.transform = 'translate(-5000px)';
        menu_opener.style.display = 'flex';
        menu_closer.style.display = 'none';
    }
    changer = !changer;
}
