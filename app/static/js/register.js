document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const messageElement = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageElement.style.color = 'green';
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
            } else {
                messageElement.style.color = 'red';
            }
            messageElement.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            messageElement.style.color = 'red';
            messageElement.textContent = 'An error occurred. Please try again.';
        });
    });
});