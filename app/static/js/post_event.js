/* Do we actually need this now?
Unlikely I thinks
const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');

countrySelect.addEventListener('change', updateCities);

const locations = {
    "Romania": ["Timisoara"]
};

function updateCities() {
    const country = countrySelect.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    if (country && locations[country]) {
        for (let city of locations[country]) {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        }
    }
}

// Initialize country select
countrySelect.innerHTML = '<option value="">Select Country</option>';
const romaniaOption = document.createElement('option');
romaniaOption.value = "Romania";
romaniaOption.textContent = "Romania";
countrySelect.appendChild(romaniaOption);

// Initialize cities
updateCities();

// Set initial values
countrySelect.value = "Romania";
updateCities();
citySelect.value = "Timisoara";
*/