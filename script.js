const app = {};

app.apiUrl = `https://api.nasa.gov/insight_weather/?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB&feedtype=json&ver=1.0`

app.apiApodUrl = `https://api.nasa.gov/planetary/apod?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB`;

app.getDayStats = (data) => {
  const solKeys = data.sol_keys;

  const weeklyTemp = [];

  for (let i = 0; i < solKeys.length; i++) {

    const solDay = parseInt(solKeys[i]) + 1;
    let date = data[solKeys[i]]["First_UTC"].slice(5, -10).split("-");
    // 2020/06/10 - June 10, 2020

		switch (date[0]) {
			case "01":
				date[0] = "Jan";
				break;
			case "02":
				date[0] = "Feb";
				break;
			case "03":
				date[0] = "Mar";
				break;
			case "04":
				date[0] = "Apr";
				break;
			case "05":
				date[0] = "May";
				break;
			case "06":
				date[0] = "Jun";
				break;
			case "07":
				date[0] = "Jul";
				break;
			case "08":
				date[0] = "Aug";
				break;
			case "09":
				date[0] = "Sept";
				break;
			case "10":
				date[0] = "Oct";
				break;
			case "11":
				date[0] = "Nov";
				break;
			case "12":
				date[0] = "Dec";
				break;
			default:
				date[0] = day[0];
				break;
		}
		
		date[1]++

		date = date.join(" ");

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
			`<div class="exit-container">
				<button class="exit" aria-label="exit-modal"><i class="fas fa-times-circle"></i></button>
			</div>
			<h3>${title}</h3>
      <img src="${url}" alt="${title}">
      <p>${explanation}</p>`;
		$('.apod-container').append(apodInfo);
		
		$('.modal-background').fadeIn();

  })
})

$('.apod-container').on('click', ".exit", function () {
	$('.modal-background').fadeOut();
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