function openPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

document.getElementById('questionsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const destination = document.getElementById('question1').value;
    const duration = document.getElementById('question2').value;
    const people = document.getElementById('question3').value;

    // Define the conditions for redirection
    let redirectUrl = '';

    // Check the values of the form inputs and set the redirect URL accordingly
    if (destination === 'Singapore' && duration === '1' && people === '3') {
        redirectUrl = 'result_singapore_1_3pax.html';
    } else if (destination === 'Singapore' && duration === '2') {
        redirectUrl = 'result_singapore_2.html';
    } else if (destination === 'Bangkok' && duration === '1') {
        redirectUrl = 'result_bangkok_1.html';
    } else {
        // If none of the conditions match, redirect to a default page
        redirectUrl = 'default_result.html';
    }

    // Redirect to the determined URL
    window.location.href = redirectUrl;
});