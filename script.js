const app = {};

app.apiUrl = `https://api.nasa.gov/insight_weather/?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB&feedtype=json&ver=1.0`

app.apiApodUrl = `https://api.nasa.gov/planetary/apod?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB`;

app.getDayStats = (data) => {
  const solKeys = data.sol_keys;

  const weeklyTemp = [];

  for (let i = 0; i < solKeys.length; i++) {

    const solDay = parseInt(solKeys[i]) + 1;
    const date = data[solKeys[i]]["First_UTC"].slice(0, -10);
    // 2020/06/10 - June 10, 2020
    console.log(date);
    let tempMax = ((data[solKeys[i]]["AT"]["mx"] - 32) * (5 / 9)).toFixed(1);
    let tempMin = ((data[solKeys[i]]["AT"]["mn"] - 32) * (5 / 9)).toFixed(1);
    
    $('.convert-temperature').on('click', () => {

    // if it is showing celsius
    if (tempMax === ((data[solKeys[i]]["AT"]["mx"] - 32) * (5 / 9)).toFixed(1) && tempMin === ((data[solKeys[i]]["AT"]["mn"] - 32) * (5 / 9)).toFixed(1)) {

        
        tempMax = ((data[solKeys[i]]["AT"]["mx"] * (9 / 5)) + 32).toFixed(1);
        tempMin = ((data[solKeys[i]]["AT"]["mn"] * (9 / 5)) + 32).toFixed(1);

        console.log(tempMax);
        console.log(tempMin);
        console.log('C');
        
        // loop this?
        $('.temperature-max').text(`${tempMax} F°`);
        $('.temperature-min').text(`${tempMin} F°`);

        // if it is showing fahrenheit
      } else {

        tempMax = ((data[solKeys[i]]["AT"]["mx"] - 32) * (5 / 9)).toFixed(1);
        tempMin = ((data[solKeys[i]]["AT"]["mn"] - 32) * (5 / 9)).toFixed(1);

        console.log(tempMax);
        console.log(tempMin);
        console.log('F');

        // loop this?
        $('.temperature-max').text(`${tempMax} C°`);
        $('.temperature-min').text(`${tempMin} C°`);

      }

    });    

    const weatherEntry =
	  `<div class="current-day-container-stats weekly-container-stats">
	      <div class="sol-date-container">
					<h2>
						<i class="fas fa-sun" title="Sol Day"></i>
						Sol ${solDay}
					</h2>
					<h2>
						<i class="fas fa-globe-americas" title="Current Day"></i> 
						${date}
					</h2>
        </div>
        <div class="temp-container">
          <h3>
            <i class="fas fa-temperature-high" title="Maximum Temperature"></i>
            High: <span class="temperature-max">${tempMax} C°</span>
          </h3>
          <h3>
            <i class="fas fa-temperature-low min-temp" title="Minimum Temperature"></i>
            Low: <span class="temperature-min">${tempMin} C°</span>
          </h3>
        </div>
      </div>`

    $('.weekly-weather-container').append(weatherEntry);
    
    weeklyTemp.push(weatherEntry)
    $('.current-day-container').append(weeklyTemp[6]);
    
  }
}

$('.apod').on('click', function(){
  $.ajax({
    url: app.apiApodUrl,
    method: 'GET',
    dataType: 'json',
  }).then(function(data){
    const { explanation, title, url} = data;
    
    const apodInfo = 
      `<h3>${title}</h3>
      <img src="${url}" alt="${title}">
      <p>${explanation}</p>`;
    $('.apod-container').append(apodInfo);
  })
})

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




// const animation = (target, string) => {
//   $(target).fadeOut(function () {
//     $(this).html(string).fadeIn();
//   });
// };

// animation('.temperature-max', `${tempMax} F°`);
// animation('.temperature-min', `${tempMin} F°`);
// animation('.temperature-max', `${tempMax} C°`);
// animation('.temperature-min', `${tempMin} C°`);