
function getApi() {
var requestURL = "https://api.openweathermap.org/geo/1.0/direct?q=Candler,US-NC,840&limit=5&appid=87285ea49687704b56de06fb7747bcf5";

fetch(requestURL)
 .then(function (response) {
 console.log(response.status)
 return response.json();
  })
 .then(function (data) {
  console.log(data);
  });

 getApi(requestURL);
}
