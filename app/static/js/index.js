document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event-card');
    
    events.forEach(event => {
        event.addEventListener('click', () => {
            const articleUrl = event.getAttribute('data-article');
            window.location.href = articleUrl;
        });
    });
});

// Loads mobile version of the website
document.addEventListener('DOMContentLoaded', function() {
    var body = document.getElementById("body");
    var content = document.getElementById("content"); 
    var hero = document.getElementById("hero");
    var hero_image = hero.querySelector('img');
    var hero_left = document.getElementById("hero__left");
    var hero_text = hero_left.querySelector("h2");
    var cta_button = document.getElementById("call__to__action__hero");
    var hero_right = document.getElementById("hero__right");
    var events = document.getElementById("events");

    if (window.matchMedia("(max-width: 1000px)").matches) {
        content.style.margin = '0 0 0 20px';
        content.style.padding = '0px';

        hero.style.flexDirection = 'column';
        hero.style.height = '35rem';
        hero.style.width = '90vw';
        hero.style.padding = '0';
        hero.style.margin = '25px 0';

        // hero_left.style.height = '0.1rem';
        hero_left.style.padding = '0';
        hero_left.style.maxWidth = '100%';
        hero_left.style.maxHeight = '35%';

        hero_text.style.margin = '0';
        hero_text.style.fontSize = '1.5rem';

        cta_button.style.margin = "15px 0 0 0";

        hero_right.style.alignItems = 'start';
        hero_right.style.justifyContent = 'center'; 

        hero_image.style.maxWidth = '500px';

        events.style.gridTemplateColumns = 'repeat(2, minmax(150px, 1fr))';
    }
});