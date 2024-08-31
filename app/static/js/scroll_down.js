let scrollButton = document.getElementById("myBtn");
const scrollAmount = 300

scrollButton.addEventListener('click', () => {
    window.scrollBy({
        top: scrollAmount,
        left: 0,
        behavior: 'smooth'
    });
});