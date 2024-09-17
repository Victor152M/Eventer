//log out functionality
function showLogoutConfirmation() {
    document.getElementById('logoutModal').style.display = 'block';
}

function closeLogoutModal() {
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


document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event-card');

    events.forEach(event => {
        event.addEventListener('click', (e) => {
            e.stopPropagation();
            // Check if the clicked element is the remove button or its parent
            if (!e.target.closest('.remove-event')) {
                const articleUrl = event.getAttribute('data-article');
                window.location.href = articleUrl;
            }
        });
    });
});

// remove event modal
let confirmResolve = null;

function showRemoveEventConfirmation() {
    return new Promise((resolve) => {
        confirmResolve = resolve;
        document.getElementById('removeEventModal').style.display = 'block';
    });
}

function cancelRemoval() {
    document.getElementById('removeEventModal').style.display = 'none';
    if (confirmResolve) {
        confirmResolve(false);
        confirmResolve = null;
    }
}

function confirmRemoval() {
    document.getElementById('removeEventModal').style.display = 'none';
    if (confirmResolve) {
        confirmResolve(true);
        confirmResolve = null;
    }
}

window.onclick = function(event) {
    var modal = document.getElementById('removeEventModal');
    if (event.target == modal) {
        cancelRemoval();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.remove-event').forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault(); // Prevent any default form submission

            const eventId = this.getAttribute('data-id');
            const confirmation = await showRemoveEventConfirmation();
            if (!confirmation) {
                return; // If the user cancels, stop the function
            }
           
            try {
                const response = await fetch('/account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: eventId })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                
                if (result.status === true) {
                    const eventCard = this.closest('.event-card');
                    if (eventCard) {
                        eventCard.style.transition = 'opacity 0.5s';
                        eventCard.style.opacity = '0';
                        setTimeout(() => {
                            eventCard.remove();
                            console.log('Event card removed:', eventId);
                        }, 500); // Remove after fade out
                    } else {
                        console.error('Event card not found.');
                    }
                } else {
                    console.error('Server returned false status');
                    alert('Failed to remove event. Please try again.');
                }
            } catch (error) {
                console.error('Error removing event:', error);
                alert('An error occurred while removing the event. Please try again.');
            }
        });
    });
});