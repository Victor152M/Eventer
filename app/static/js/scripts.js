document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event-card');
    
    events.forEach(event => {
        event.addEventListener('click', () => {
            const articleUrl = event.getAttribute('data-article');
            window.location.href = articleUrl;
        });
    });
});