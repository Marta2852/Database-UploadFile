// Navbar Links
const createUserBtn = document.getElementById('createUserBtn');
const showUsersBtn = document.getElementById('showUsersBtn');
const uploadFileBtn = document.getElementById('uploadFileBtn');
const showFilesBtn = document.getElementById('showFilesBtn');
const userListSection = document.getElementById('userListSection');
const createUserSection = document.getElementById('createUserSection');
const viewFilesSection = document.getElementById('viewFilesSection');
const uploadFileSection = document.getElementById('uploadFileSection');

// Show Create User Section
createUserBtn.addEventListener('click', () => {
    createUserSection.style.display = 'block';
    userListSection.style.display = 'none';
    viewFilesSection.style.display = 'none';
    uploadFileSection.style.display = 'none';
});

// Show User List Section
showUsersBtn.addEventListener('click', async () => {
    createUserSection.style.display = 'none';
    userListSection.style.display = 'block';
    viewFilesSection.style.display = 'none';
    uploadFileSection.style.display = 'none';

    const users = await fetchUsers();
    displayUsers(users);
});

// Show File Upload Section
uploadFileBtn.addEventListener('click', () => {
    createUserSection.style.display = 'none';
    userListSection.style.display = 'none';
    viewFilesSection.style.display = 'none';
    uploadFileSection.style.display = 'block';
});

// Show Files Section
showFilesBtn.addEventListener('click', async () => {
    createUserSection.style.display = 'none';
    userListSection.style.display = 'none';
    uploadFileSection.style.display = 'none';
    viewFilesSection.style.display = 'block';

    const files = await fetchFiles();
    displayFiles(files);
});

// Fetch Files from Database
async function fetchFiles() {
    try {
        const response = await fetch('fetchFiles.php');
        if (!response.ok) {
            throw new Error('Failed to fetch files');
        }
        const data = await response.json(); // Parse the JSON response
        return data;
    } catch (error) {
        console.error(error); // Log error if fetching fails
        return []; // Return an empty array if there’s an error
    }
}

// Display Files in Table with Delete Option
function displayFiles(files) {
    const filesTable = document.getElementById('filesTable');
    
    if (filesTable) {
        if (files.length > 0) {
            let table = `
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Size</th>
                            <th>Uploaded On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Loop through each file and generate a row in the table
            files.forEach(file => {
                table += `
                    <tr>
                        <td>${file.file_name}</td>
                        <td>${file.size}</td>
                        <td>${file.timestamp}</td>
                        <td>
                            <a href="${file.file_path}" target="_blank">View</a> | 
                            <button class="delete-btn" data-id="${file.id}">Delete</button>
                        </td>
                    </tr>
                `;
            });

            table += `</tbody></table>`;
            filesTable.innerHTML = table; // Insert the table into the page

            // Add delete event listeners to all delete buttons
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const fileId = e.target.getAttribute('data-id');
                    deleteFile(fileId);
                });
            });
        } else {
            filesTable.innerHTML = '<p>No files found.</p>'; // Display message if no files found
        }
    }
}

// Delete File Function
async function deleteFile(fileId) {
    const response = await fetch(`deleteFile.php?id=${fileId}`);
    const result = await response.json();

    if (result.status === 'success') {
        alert(result.message); // Show success message
        // Refresh the files list after deletion
        const files = await fetchFiles();
        displayFiles(files);
    } else {
        alert(result.message); // Show error message
    }
}
