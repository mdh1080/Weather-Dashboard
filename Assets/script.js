//Search List and Results

const searchInput = document.querySelector('.search-btn')

const clearButton = document.getElementById('clear')

clearButton.addEventListener("click", () => {
})

function processWeatherData(data) {

  for (let i = 0; i < 5; i++) {
    let currentDayDt = document.querySelector("#col-" + i);
    let currentDayIcon = document.querySelector("#icon-" + i);
    let currentDayTemp = document.querySelector("#day" + i + "-temp");
    let currentDayWind = document.querySelector("#day" + i + "-wind");
    let currentDayHumidity = document.querySelector("#day" + i + "-humidity");
    let iconId = data.list[i * 8].weather[0].icon;

    let dateAndTime = data.list[i * 8].dt_txt;
    let parts = dateAndTime.split(' ');
   
    if (i === 0) {
      currentDayDt.textContent = data.city.name + ' (' + parts[0] + ')';
    } else {
      currentDayDt.textContent = parts[0];
    }
    currentDayTemp.textContent = data.list[i * 8].main.temp;
    currentDayWind.textContent = data.list[i * 8].weather[0].id;
    currentDayHumidity.textContent= data.list[i * 8].main.humidity;
    currentDayIcon.src = "http://openweathermap.org/img/wn/" + iconId + ".png";
  }
}

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
                            processWeatherData(data);
                        })



                        });
                };

