document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event');
    
    events.forEach(event => {
        event.addEventListener('click', () => {
            const articleUrl = event.getAttribute('data-article');
            window.location.href = articleUrl;
        });
    });
});
