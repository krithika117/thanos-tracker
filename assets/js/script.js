const BASE_URL = "https://krithika-marvel-api.vercel.app";
const dropdown = document.getElementById('planet-dropdown');
const planetNameElement = document.getElementById('planet-name');
const planetInfoElement = document.getElementById('planet-info');
const planetContainer = document.getElementById('planet-container');

fetch(BASE_URL + '/planets')
    .then(response => response.json())
    .then(data => {
        data.forEach(planet => {
            const option = document.createElement('option');
            option.value = planet.name;
            option.textContent = planet.name;
            if (planet.name === 'Vormir') {
                option.selected = true; // Set "Vormir" as the default selected value
                displayPlanetInfo('Vormir');
            }
            dropdown.appendChild(option);
        });
    })
    .catch(error => {
        console.log('Error:', error);
    });

document.getElementById('planet-dropdown').addEventListener('change', (e) => {
    const selectedPlanet = e.target.value;
    displayPlanetInfo(selectedPlanet);
});

async function displayPlanetInfo(selectedPlanet) {
    try {
        const response = await fetch(`${BASE_URL}/planets/${selectedPlanet}`);
        const data = await response.json();

        planetContainer.className = 'planet ' + selectedPlanet.toLowerCase();
        planetNameElement.textContent = data.stone ? `${selectedPlanet} ${data.stone}` : selectedPlanet;

        let info = '';
        if (data.stone) {
            info = `${data.stone}`;
            if (data.distance) {
                info += ` and Thanos is ${data.distance} ⚠️`;
            } else {
                info += `and Thanos is not a threat`;
            }
        } else {
            info = 'No additional information available.';
        }

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body p-3';
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = selectedPlanet;
        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = info;

        const card = document.createElement('div');
        card.className = 'card blue';
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        const cardContainer = document.querySelector('#planet-info');
        cardContainer.innerHTML = '';
        cardContainer.appendChild(card);

    } catch (error) {
        console.log('Error:', error);
    }
}