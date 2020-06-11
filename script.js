const app = {};

app.apiUrl = `https://api.nasa.gov/insight_weather/?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB&feedtype=json&ver=1.0`

app.getDayStats = (data) => {
  const solKeys = data.sol_keys;

  const weeklyTemp = [];

  for (let i = 0; i < solKeys.length; i++) {
    const dayStats = {
      solDay: solKeys[i],
      tempMax: ((data[solKeys[i]]["AT"]["mx"] - 32) * (5 / 9)).toFixed(1),
      tempMin: ((data[solKeys[i]]["AT"]["mn"] - 32) * (5 / 9)).toFixed(1),
      date: data[solKeys[i]]["First_UTC"].slice(0, -10),
      season: data[solKeys[i]]["Season"],
    }
    
    const weatherEntry =
	  `<div class="current-day-container-stats weekly-container-stats">
	      <div class="sol-date-container">
					<h2>
						<i class="fas fa-sun" title="Sol Day"></i>
						Sol ${dayStats.solDay}
					</h2>
					<h2>
						<i class="fas fa-globe-americas" title="Current Day"></i> 
						${dayStats.date}
					</h2>
        </div>
        <div class="temp-container">
          <h3>
            <i class="fas fa-temperature-high max-temp" title="Maximum Temperature"></i>
            High: <span>${dayStats.tempMax} C°</span>
          </h3>
          <h3>
            <i class="fas fa-temperature-low min-temp" title="Minimum Temperature"></i>
            Low: <span>${dayStats.tempMin} C°</span>
          </h3>
        </div>
      </div>`

    weeklyTemp.push(weatherEntry)

    $('.weekly-weather-container').append(weatherEntry);
    $('.current-day-container').append(weeklyTemp[6]);
    
  }
}


// app.convertTemperature = () => {
//   $('.convert-temperature').on('click', () => {
//     dayStats.tempMax = ((data[solKeys[i]]["AT"]["mx"] - 32) * (5 / 9)).toFixed(1),
//       dayStats.tempMin = ((data[solKeys[i]]["AT"]["mn"] - 32) * (5 / 9)).toFixed(1),
//       console.log(dayStats.tempMax);
//     console.log(dayStats.tempMin);
//   });
// }

// function temperatureConverter(valNum) {
//   valNum = parseFloat(valNum);
//   document.getElementById("outputCelsius").innerHTML = (valNum-32) / 1.8;
// } 



app.init = () => {
  $.ajax({
    url: app.apiUrl,
    method: 'GET',
    dataType: 'json',
  }).then(function(data) {
    app.getDayStats(data);
  });
}

$(function(){
  app.init();
});