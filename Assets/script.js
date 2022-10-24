//Search List and Results

const searchInput = document.querySelector('.search-btn')

const clearButton = document.getElementById('clear')

clearButton.addEventListener("click", () => {
})

function setList(results) {

    for (const city of results) {
        const resultItem = document.createElement('li')
        resultItem.classList.add('result-item')

        const text = document.createTextNode(city.name)
        resultItem.appendChild(text)

        list.appendChild(resultItem)
    }
}
        function clearList() {
            while (list.firstChild) {
                list.removeChild(list.firstChild)
            }
        }

        searchInput.addEventListener("click", (e) => {
            e.preventDefault()
            let citySearched = document.querySelector(".input")
            let value = citySearched.value

            if (value && value.trim().length > 0) {
                value = value.trim().toLowerCase()
                getWeather(value)
            } else {
                clearList()
            }
            clearButton.addEventListener("click", () => {
                clearList()
            })

            function noResults() {
                const error = document.createElement('li')
                error.classList.add('error-message')

                const text = document.createTextNode('No results found. Sorry!')
                error.appendChild(text)
                list.appendChild(error)
            }

            function setList(results) {
                clearList()
                for (const person of results) {
                    const resultItem = document.createElement('li')
                    resultItem.classList.add('result-item')
                    const text = document.createTextNode(person.name)
                    resultItem.appendChild(text)
                    list.appendChild(resultItem)
                }

                if (results.length === 0) {
                    noResults()
                }
            }

        })

        //Weather API
        const baseURL = 'https://api.openweathermap.org/';
        const apiKey = '87285ea49687704b56de06fb7747bcf5';

        function getWeather(myTown) {

            let geocodingURL = baseURL + 'geo/1.0/direct?q=' + myTown + '&limit=5&appid=' + apiKey;

            console.log('Starting geocoding...');
            fetch(geocodingURL)
                .then(function (response) {
                    console.log('Response status from geocoding (200 means OK): ', response.status);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    let firstResult = data[0];
                    let latitude = data[0].lat;
                    let longitude = data[0].lon;
                    console.log('The latitude is: ', latitude);
                    console.log('The longitude is: ' + longitude);
                    let weatherRequestURL = baseURL + '/data/2.5/forecast?' +
                        'lat=' + latitude +
                        '&lon=' + longitude +
                        '&units=imperial' +
                        '&appid=' + apiKey;
                    console.log('Starting weather request...');
                    fetch(weatherRequestURL)
                        .then(function (response) {
                            console.log('Response status from geocoding (200 means OK): ', response.status);
                            console.log(response.status);
                            return response.json();
                        })

                    //Five day forecast
                        .then(function (data) {
                            console.log(data)
                            let day0dt=document.querySelector("#col-0")
                            let day0Temp = document.querySelector("#day0-temp")
                            let day0Wind = document.querySelector("#day0-wind")
                            let day0Humidity = document.querySelector("#day0-humidity")
                            day0dt.textContent=data.list[0].dt_txt
                            day0Temp.textContent = data.list[0].main.temp
                            day0Wind.textContent = data.list[0].weather[0].id
                            day0Humidity.textContent= data.list[0].main.humidity
                            let day1dt=document.querySelector("#col-1")
                            let day1Temp = document.querySelector("#day1-temp")
                            let day1Wind = document.querySelector("#day1-wind")
                            let day1Humidity = document.querySelector("#day1-humidity")
                            day1dt.textContent=data.list[8].dt_txt
                            day1Temp.textContent = data.list[8].main.temp
                            day1Wind.textContent = data.list[8].wind.speed
                            day1Humidity.textContent= data.list[8].main.humidity
                            let day2dt=document.querySelector("#col-2")
                            let day2Temp = document.querySelector("#day2-temp")
                            let day2Wind = document.querySelector("#day2-wind")
                            let day2Humidity = document.querySelector("#day2-humidity")
                            day2dt.textContent=data.list[16].dt_txt
                            day2Temp.textContent = data.list[16].main.temp
                            day2Wind.textContent = data.list[16].wind.speed
                            day2Humidity.textContent= data.list[16].main.humidity
                            let day3dt=document.querySelector("#col-3")
                            let day3Temp = document.querySelector("#day3-temp")
                            let day3Wind = document.querySelector("#day3-wind")
                            let day3Humidity = document.querySelector("#day3-humidity")
                            day3dt.textContent=data.list[24].dt_txt
                            day3Temp.textContent = data.list[24].main.temp
                            day3Wind.textContent = data.list[24].wind.speed
                            day3Humidity.textContent= data.list[24].main.humidity
                            let day4dt=document.querySelector("#col-4")
                            let day4Temp = document.querySelector("#day4-temp")
                            let day4Wind = document.querySelector("#day4-wind")
                            let day4Humidity = document.querySelector("#day4-humidity")
                            day4dt.textContent=data.list[32].dt_txt
                            day4Temp.textContent = data.list[32].main.temp
                            day4Wind.textContent = data.list[32].wind.speed
                            day4Humidity.textContent= data.list[32].main.humidity
                        })



                        });
                };

