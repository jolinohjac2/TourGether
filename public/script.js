function openPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

function submitAnswers(event) {
    event.preventDefault();
    console.log('Form submitted!'); // Add this line for logging


    // Collect form data
    const destination = document.getElementById('question1').value;
    const duration = document.getElementById('question2').value;
    const groupSize = document.getElementById('question3').value;

     // Redirect to results page with query parameters
     window.location.href = `/result.html?destination=${destination}&duration=${duration}&groupSize=${groupSize}`;
    }