async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const loading = document.getElementById("loading");
    const result = document.getElementById("weatherResult");

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    loading.textContent = "Loading...";
    result.innerHTML = "";

    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        const weather = data.current_condition[0];

        result.innerHTML = `
            <h3>${city}</h3>
            <p><strong>Temperature:</strong> ${weather.temp_C} °C</p>
            <p><strong>Feels Like:</strong> ${weather.FeelsLikeC} °C</p>
            <p><strong>Humidity:</strong> ${weather.humidity}%</p>
            <p><strong>Weather:</strong> ${weather.weatherDesc[0].value}</p>
        `;

    } catch (error) {
        result.innerHTML = `
            <p style="color:red;">Could not fetch weather data. Please try again.</p>
        `;
    }

    loading.textContent = "";
}