document.querySelector("form").addEventListener('submit', function(e) {
    let fileInput = document.getElementById("image");
    if (fileInput.files.length > 0){
        let fileSize = fileInput.files[0].size / 1024 / 1024;
        if (fileSize > 16) {
            e.preventDefault();
            alert("File size exceeds 16MB. Please choose a smaller file.");
        }
    }
});
