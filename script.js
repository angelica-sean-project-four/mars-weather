const app = {};

app.apiUrl = `https://api.nasa.gov/insight_weather/?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB&feedtype=json&ver=1.0`

app.getDayStats = (data) => {
  const solKeys = data.sol_keys;

  const weeklyTemp = [];

  for (let i = 0; i < solKeys.length; i++) {
    const dayStats = {
      solDay: solKeys[i],
      tempMax: data[solKeys[i]]["AT"]["mx"].toFixed(1),
      tempMin: data[solKeys[i]]["AT"]["mn"].toFixed(1),
      date: data[solKeys[i]]["First_UTC"].slice(0, -10),
      season: data[solKeys[i]]["Season"],
    }
    
    const weatherEntry =
	  `<div class="today daily-entry">
	      <div class="sol-date-container">
					<h2>
						<i class="far fa-sun" title="Sol day"></i>
						${dayStats.solDay}
					</h2>
					<h2>
						<i class="fas fa-globe-americas" title="Current day"></i> 
						${dayStats.date}
					</h2>
		  </div>
		  <div class="temp-container">
				<h3>
					<i class="fas fa-temperature-high max-temp" title="Max temperature"></i>
					${dayStats.tempMax}
				</h3>
				<h3>
					<i class="fas fa-temperature-low min-temp" title="Min temperature"></i>
					${dayStats.tempMin}
				</h3>
		  </div>
      </div>`

    weeklyTemp.push(weatherEntry)

    $('.weekly-weather').append(weatherEntry);
    $('.current-day').append(weeklyTemp[6]);
  }
}

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