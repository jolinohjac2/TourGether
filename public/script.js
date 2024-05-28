
// Function to OPEN Popup
function openPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

// Function to CLOSE Popup
function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

// Form Submission Event Listener
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
    
    } else if (destination === 'Singapore' && duration === '1' && people === '4') {
        redirectUrl = 'result_singapore_1_4pax.html';
    } else if (destination === 'Singapore' && duration === '1' && people === '5') {
        redirectUrl = 'result_singapore_1_5pax.html';
    } else if (destination === 'Singapore' && duration === '1' && people === '6') {
        redirectUrl = 'result_singapore_1_6pax.html';

    } else if (destination === 'Bangkok' && duration === '1' && people === '3') {
        redirectUrl = 'result_bangkok_1_3pax.html';

    } else if (destination === 'Bangkok' && duration === '1' && people === '4') {
        redirectUrl = 'result_bangkok_1_4pax.html';

    } else if (destination === 'Bangkok' && duration === '1' && people === '5') {
        redirectUrl = 'result_bangkok_1_5pax.html';

    } else if (destination === 'Bangkok' && duration === '1' && people === '6') {
        redirectUrl = 'result_bangkok_1_6pax.html';

    } else if (destination === 'Bangkok' && duration === '2' && people === '3') {
        redirectUrl = 'result_bangkok_2_3pax.html';

    } else if (destination === 'Bangkok' && duration === '2' && people === '4') {
        redirectUrl = 'result_bangkok_2_4pax.html';
        
    } else if (destination === 'Bangkok' && duration === '2' && people === '5') {
        redirectUrl = 'result_bangkok_2_5pax.html';

    } else if (destination === 'Bangkok' && duration === '2' && people === '6') {
        redirectUrl = 'result_bangkok_2_6pax.html';

    } else if (destination === 'Bangkok' && duration === '3' && people === '3') {
        redirectUrl = 'result_bangkok_3_3pax.html';
    } else if (destination === 'Bangkok' && duration === '3' && people === '4') {
        redirectUrl = 'result_bangkok_3_4pax.html';
    } else if (destination === 'Bangkok' && duration === '3' && people === '5') {
        redirectUrl = 'result_bangkok_3_5pax.html';
    } else if (destination === 'Bangkok' && duration === '3' && people === '6') {
        redirectUrl = 'result_bangkok_3_6pax.html';

    } else if (destination === 'Bangkok' && duration === '4' && people === '3') {
        redirectUrl = 'result_bangkok_3_3pax.html';
    } else if (destination === 'Bangkok' && duration === '4' && people === '4') {
        redirectUrl = 'result_bangkok_3_4pax.html';
    } else if (destination === 'Bangkok' && duration === '4' && people === '5') {
        redirectUrl = 'result_bangkok_3_5pax.html';
    } else if (destination === 'Bangkok' && duration === '4' && people === '6') {
        redirectUrl = 'result_bangkok_3_6pax.html';
    
    } else if (destination === 'Bangkok' && duration === '5' && people === '3') {
        redirectUrl = 'result_bangkok_5_3pax.html';   

    } else if (destination === 'Bangkok' && duration === '5' && people === '6') {
        redirectUrl = 'result_bangkok_5_6pax.html'; 

    } else {
        // If none of the conditions match, redirect to a default page
        redirectUrl = 'default_result.html';
    }

    // Redirect to the determined URL
    window.location.href = redirectUrl;
});