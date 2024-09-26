const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8c6b501310ad7b104e3652da23e35b4f";
const highLow = document.querySelector(".highLow");

weatherForm.addEventListener("submit", async event => {
    //prevent page from refreshing
    event.preventDefault();

    const city = cityInput.value;

    //if there is an input
    if(city){
        try{
            //get weather data and display
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error){
            //show error
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a valid city");
    }

});

async function getWeatherData(city){
    //get weather API data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok){
        throw new Error("Could not fetch weather data");
    } 
    return await response.json();
}

function displayWeatherInfo(data){

    //Get API info
    const {name: city, 
        main: {temp, humidity, temp_max, temp_min}, 
        weather: [{description, id}]} = data;

    //Reveal card
    card.textContent = "";
    card.style.display = "flex";

    //create new dom elements
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const highLowTempDisplay = document.createElement("p");

    //update content of new dom elements
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    highLowTempDisplay.textContent = `H:${((temp_max - 273.15) * 9/5 + 32).toFixed(0)}     L:${((temp_min - 273.15) * 9/5 + 32).toFixed(0)}`;
    weatherEmoji.textContent = getWeatherEmoji(id);
    

    //add css classes
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    highLowTempDisplay.classList.add("highLow");

    // Add to card class
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(highLowTempDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    //Return appropriate weather emoji
    switch (true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
    //display appropriate error message
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add(".errorDisplay");

    //show card
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}