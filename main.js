// script.js

// Function to handle form submission and data transfer
function transferData() {
    // Get values from lectureManagement.html inputs
    const subjectName = document.querySelector('.list-items input[placeholder="اسم المادة"]').value;
    const professorName = document.querySelector('.list-items input[placeholder="اسم الدكتور"]').value;
    const classGroup = document.querySelector('.list-items input[placeholder="الشعبة"]').value;
    const section = document.querySelector('.list-items input[placeholder="الفرقة"]').value;

    // Set fixed values for مدرج and عدد المحاضرات
    const auditorium = 4;
    const lectureCount = 12;

    // Store values in localStorage
    localStorage.setItem('subjectName', subjectName);
    localStorage.setItem('professorName', professorName);
    localStorage.setItem('classGroup', classGroup);
    localStorage.setItem('section', section);
    localStorage.setItem('auditorium', auditorium);
    localStorage.setItem('lectureCount', lectureCount);
}

// Function to populate fields in studentLectureSearch.html
function populateFields() {
    // Retrieve values from localStorage
    const subjectName = localStorage.getItem('subjectName');
    const professorName = localStorage.getItem('professorName');
    const classGroup = localStorage.getItem('classGroup');
    const section = localStorage.getItem('section');
    const auditorium = localStorage.getItem('auditorium');
    const lectureCount = localStorage.getItem('lectureCount');

    // Populate fields and disable them
    document.querySelector('.lectures-list input[placeholder="اسم المادة"]').value = subjectName;
    document.querySelector('.lectures-list input[placeholder="اسم الدكتور"]').value = professorName;
    document.querySelector('.lectures-list input[placeholder="الشعبة"]').value = classGroup;
    document.querySelector('.lectures-list input[placeholder="الفرقة"]').value = section;
    document.querySelector('.lectures-list input[placeholder="المدرج"]').value = auditorium;
    document.querySelector('.lectures-list input[placeholder="عدد المحاضرات"]').value = lectureCount;

    // Disable the fields
    document.querySelectorAll('.lectures-list input').forEach(input => {
        input.disabled = true;
    });
}

// Function to check if all fields are filled and enable/disable the search button
function checkFields() {
    const inputs = document.querySelectorAll('.list-items input');
    const searchButton = document.querySelector('.btn-search');
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });

    searchButton.disabled = !allFilled;
}

// Attach the transferData function to the search button in lectureManagement.html
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.btn-search');
    const inputs = document.querySelectorAll('.list-items input');

    if (searchButton) {
        searchButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submission
            transferData();
            window.location.href = 'studentLectureSearch.html'; // Redirect to the studentLectureSearch.html page
        });
        searchButton.disabled = true; // Initially disable the search button
    }

    // Add input event listeners to check fields on every input change
    inputs.forEach(input => {
        input.addEventListener('input', checkFields);
    });

    // Call populateFields if on studentLectureSearch.html
    if (document.body.contains(document.querySelector('.lectures-list'))) {
        populateFields();
    }
});