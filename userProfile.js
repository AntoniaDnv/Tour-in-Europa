const editButton = document.getElementById('editButton');
const inputs = document.querySelectorAll('.profile-info input');

// Attach click event listener to toggle edit/save mode
editButton.addEventListener('click', () => {
    const isEditing = editButton.textContent.trim() === 'Save Changes'; // Check button state

    inputs.forEach(input => input.disabled = isEditing); // Enable/disable input fields

    editButton.textContent = isEditing ? 'Edit Profile' : 'Save Changes'; // Toggle button text
});
