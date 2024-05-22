window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
    const duration = urlParams.get('duration');
    const groupSize = urlParams.get('groupSize');

    fetch('/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, duration, groupSize }),
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';
        
        const message = document.createElement('p');
        message.textContent = data.message;
        resultsContainer.appendChild(message);

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>S/N</th><th>Short Description</th><th>Category</th><th>Avg. Time Spent</th><th>Google Ratings</th>';
        table.appendChild(headerRow);

        data.suggestions.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.sn}</td><td>${item.shortDescription}</td><td>${item.category}</td><td>${item.avgTimeSpent}</td><td>${item.googleRatings}</td>`;
            table.appendChild(row);
        });

        resultsContainer.appendChild(table);
    })
    .catch(error => console.error('Error:', error));
});
