function openPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

function submitAnswers(event) {
    event.preventDefault();

    const destination = document.getElementById('question1').value;
    const duration = document.getElementById('question2').value;
    const people = document.getElementById('question3').value;

    const data = { destination, duration, people };

    fetch('/api/getPlacesOfInterest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error from server:', data.details || data.error);
            alert('Server error: ' + (data.details || data.error));
        } else {
            window.location.href = `/result.html?data=${encodeURIComponent(JSON.stringify(data.text))}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
