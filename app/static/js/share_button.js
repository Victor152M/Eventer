const copyDiv = document.getElementById('link_button');

copyDiv.addEventListener('click', function() {
  const currentURL = window.location.href; // Get the current tab's URL

  // Copy the URL to the clipboard
  navigator.clipboard.writeText(currentURL).catch(err => {
    console.error('Error copying to clipboard:', err);
  });
});
