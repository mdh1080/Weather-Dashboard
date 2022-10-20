const baseURL =  'https://api.openweathermap.org/';
const apiKey =  '87285ea49687704b56de06fb7747bcf5';

// Defining the function. Not called yet. It takes the town we are interested in, as an argument.
function getWeather(myTown) {

  let geocodingURL= baseURL + 'geo/1.0/direct?q=' + myTown + '&limit=5&appid=' + apiKey;

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
          .then(function(response) {
            console.log('Response status from geocoding (200 means OK): ', response.status);
            console.log(response.status);
            return response.json();
          })
            .then(function(data) {
              console.log(data);
              // Let's 'alert' the temperature for the first day. But there's a lot more info in there.
              alert('Temperature for tomorrow: ' + data.list[0].main.temp);
            });
       });
}

// Now let's actually call the function. Give it the town we are interested in as an argument.
let myTown = "Candler,US-NC,840";
getWeather(myTown);

