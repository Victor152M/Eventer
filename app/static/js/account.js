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
        event.addEventListener('click', () => {
            const articleUrl = event.getAttribute('data-article');
            window.location.href = articleUrl;
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

// event listener for the remove button
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.remove-event').forEach(button => {
        button.addEventListener('click', async function() {
            const eventId = this.getAttribute('data-id');
            const confirmation = await showRemoveEventConfirmation();
            if (!confirmation) {
                return; // If the user cancels, stop the function
            }
            
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