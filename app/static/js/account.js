//log out functionality
function showLogoutConfirmation() {
    document.getElementById('logoutModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('logoutModal').style.display = 'none';
}
function logout() {
    // Redirect to logout page (which redirects to the home page)
    window.location.href = '/logout';
    closeModal();
}

window.onclick = function(event) {
    var modal = document.getElementById('logoutModal');
    if (event.target == modal) {
        closeModal();
    }
}

// event listener for the remove button
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.remove-event').forEach(button => {
        button.addEventListener('click', async function() {
            const eventId = this.getAttribute('data-id');
            const response = await fetch('/api/account/remove_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: eventId})
            });

            const result = await response.json();
            if (result.status === true){
                const eventCard = this.closest('.event-card');
                if (eventCard) {
                    console.log('Event card found and will be removed:', eventCard);
                    eventCard.remove();  // Remove event card from the DOM
                } else {
                    console.error('Event card not found.');
                }
            }
        });
    });
});