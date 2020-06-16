const app = {};

// mars weather API
app.apiUrl = `https://api.nasa.gov/insight_weather/?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB&feedtype=json&ver=1.0`;

// astronomy photo of the day API
app.apiAPODUrl = `https://api.nasa.gov/planetary/apod?api_key=H0DYUa5B7S8DznB16FCH8Ym8KEmJgbwTp9eb0guB`;

const animation = (target, string) => {
  $(target).fadeOut(function () {
    $(this).html(string).fadeIn();
  });
};

app.getDayStats = (data) => {
  
  const solKeys = data.sol_keys;
  const weeklyTemp = [];

  for (let i = 0; i < solKeys.length; i++) {

		// grabbing solDay and earth date
    const solDay = parseInt(solKeys[i]) + 1;
		const unixEpochTime = data[solKeys[i]]['First_UTC'];
		
		// converting date from YYYY/MM/DD to Month, Day
		const newDate = new Date(unixEpochTime);
		const dateFull = new Date(newDate.setTime(newDate.getTime() + 1.05 * 86400000));

		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const dateMonth = dateFull.getMonth();
		const dateDay = dateFull.getDate();		

		const date = `${monthNames[dateMonth]} ${dateDay}`;		
		
    // converting temperature to celsius
    let tempMax = ((data[solKeys[i]]['AT']['mx'] - 32) * (5 / 9)).toFixed(1);
    let tempMin = ((data[solKeys[i]]['AT']['mn'] - 32) * (5 / 9)).toFixed(1);
    
    $('.convert-temperature').on('click', () => {
    // if it is showing celsius
    if (tempMax === ((data[solKeys[i]]['AT']['mx'] - 32) * (5 / 9)).toFixed(1) && tempMin === ((data[solKeys[i]]['AT']['mn'] - 32) * (5 / 9)).toFixed(1)) {
				tempMax = data[solKeys[i]]['AT']['mx'].toFixed(1);
				tempMin = data[solKeys[i]]['AT']['mn'].toFixed(1);

				animation(`#high-${i}`, `${tempMax} F°`);
        animation(`#low-${i}`, `${tempMin} F°`);
        animation('.convert-temperature', `Fahrenheit <i class="fas fa-arrow-right"></i> Celsius`);
        // if it is showing fahrenheit
      } else {
        tempMax = ((data[solKeys[i]]['AT']['mx'] - 32) * (5 / 9)).toFixed(1);
        tempMin = ((data[solKeys[i]]['AT']['mn'] - 32) * (5 / 9)).toFixed(1);

				animation(`#high-${i}`, `${tempMax} C°`);
        animation(`#low-${i}`, `${tempMin} C°`);
        animation('.convert-temperature', `Celsius <i class="fas fa-arrow-right"></i> Fahrenheit`);
      };
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
            High: <span id="high-${i}" class="temperature-max">${tempMax} C°</span>
          </h3>
          <h3>
            <i class="fas fa-temperature-low min-temp" title="Minimum Temperature"></i>
            Low: <span id="low-${i}" class="temperature-min">${tempMin} C°</span>
          </h3>
        </div>
      </div>`;

    $('.weekly-weather-container').append(weatherEntry);
    
    weeklyTemp.push(weatherEntry)
    $('.current-day-container').append(weeklyTemp[6]);
  };
};

$('.apod').on('click', function(){
  $.ajax({
    url: app.apiAPODUrl,
    method: 'GET',
    dataType: 'json',
  }).then(function(data){
    const { explanation, title, url, media_type } = data;
		
		if (media_type === "video") {
			const aPODVideo = 
			`<div class="exit-container">
				<button class="exit" aria-label="exit-modal"><i class="fas fa-times-circle"></i></button>
			</div>
			<h3>${title}</h3>
			<div class="video-container">
				<iframe width="560" height="315" src="${url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
			</div>
			<div>
				<p>${explanation}</p>
			</div>`;

			$('.apod-container').empty().append(aPODVideo);
		} else {
			const aPODImg =
			`<div class="exit-container">
				<button class="exit" aria-label="exit-modal"><i class="fas fa-times-circle"></i></button>
			</div>
			<h3>${title}</h3>
			<div class="image-container">
				<img src="${url}" alt="${title}">
			</div>
			<div class="modal-paragraph">
				<p>${explanation}</p>
			</div>`;

			$('.apod-container').empty().append(aPODImg);
		}; 	
		
		$('.modal-background').fadeIn();
  });
});

$('.apod-container').on('click', ".exit", function () {
  $('.modal-background').fadeOut();
  $('iframe').attr('src', 'url');
});

app.init = () => {
  $.ajax({
    url: app.apiUrl,
    method: 'GET',
    dataType: 'json',
  }).then(function(data) {
    app.getDayStats(data);
  }); 
};

$(function(){
  app.init();
});