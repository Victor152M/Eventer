document.addEventListener('DOMContentLoaded', function() {
    const feedbackWidget = document.getElementById('feedback-widget');
    const feedbackToggle = document.getElementById('feedback-toggle');
    const feedbackSubmit = document.getElementById('feedback-submit');
    const feedbackText = document.getElementById('feedback-text');

    feedbackToggle.addEventListener('click', function() {
        feedbackWidget.classList.toggle('feedback-closed');
    });

    feedbackSubmit.addEventListener('click', function() {
        const feedback = feedbackText.value.trim();
        if (feedback) {
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback: feedback })
            })
            .then(response => {
                response.json();
                console.log(response);
            })
            .then(data => {
                feedbackText.value = '';
                feedbackWidget.classList.add('feedback-closed');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while submitting feedback.');
            });
        } else {
            alert('Please enter some feedback before submitting.');
        }
    });
});