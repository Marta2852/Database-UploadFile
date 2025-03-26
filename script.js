document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("uploadFileBtn").addEventListener("click", function () {
        showSection("uploadFileSection");
    });

    document.getElementById("deleteFileBtn").addEventListener("click", function () {
        showSection("deleteFileSection");
    });

    function showSection(sectionId) {
        document.getElementById("uploadFileSection").style.display = "none";
        document.getElementById("deleteFileSection").style.display = "none";
        document.getElementById(sectionId).style.display = "block";
    }

    // Change label text when a file is selected
    const fileInput = document.getElementById("fileInput");
    const fileLabel = document.getElementById("fileLabel");

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileLabel.textContent = fileInput.files[0].name;
        } else {
            fileLabel.textContent = "No file selected";
        }
    });
});
