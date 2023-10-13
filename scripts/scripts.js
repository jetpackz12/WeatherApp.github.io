/*
reference: https://www.youtube.com/watch?v=w0VEOghdMpQ&t=92s
https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=Asia%2FTokyo
*/
const getWeather = async (lat, lon, timezone) => {
    const getWeatherHourly = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`);
    const data = getWeatherHourly.json();
    return data;
}

const parseCurrentWeather = ({ current_weather, daily }) => {
    //destructuring
    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode,
    } = current_weather;

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxAppTemp],
        apparent_temperature_min: [minAppTemp],
        precipitation_sum: [precip],
    } = daily;

    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highAppTemp: Math.round(maxAppTemp),
        lowAppTemp: Math.round(minAppTemp),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        iconCode,
    }

}

const parseDailyWeather = ({ daily }) => {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index]),
        }
    });
}

const parseHourlyWeather = ({ hourly, current_weather }) => {
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: hourly.weathercode[index],
            temp: Math.round(hourly.temperature_2m[index]),
            appTemp: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100) / 100,
        }
    }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
}

const renderWeather = (current, daily, hourly ) => {
    renderCurrentWeather(current);
    renderDailyWeather(daily);
    renderHourlyWeather(hourly);
    
    // document.body.classList.remove("scroll-hidden");
    document.querySelector('.spinner').style.display = 'none';
    document.querySelector('.blurrd').classList.remove("blurrd");
}

const setValue = (selector, value, {parent = document} = {} ) => {
    parent.querySelector(`[data-${selector}]`).textContent = value;
}

const setIconValue = (value, icon, color) => {
    return `<i class="fa ${value} ${icon}" ${color}></i>`;
}

const setIcon = (selector, value, icon, {parent = document} = {}) => {
    switch (value) {
        case 0:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-sun', icon, 'style = "color: yellow;"');
            break;

        case 1:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-sun', icon, 'style = "color: yellow;"');
            break;

        case 2:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-sun', icon, 'style = "color: yellow;"');
            break;

        case 3:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-sun', icon, 'style = "color: yellow;"');
            break;
            
        case 45:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-smog', icon);
            break;
            
        case 48:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-smog', icon);
            break;
            
        case 51:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-rain', icon);
            break;

        case 53:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-rain', icon);
            break;

        case 55:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-rain', icon);
            break;
            
        case 56:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-temperature-half', icon);
            break;
            
        case 57:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-temperature-half', icon);
            break;
            
        case 61:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-rain', icon);
            break;
            
        case 63:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-rain', icon);
            break;
            
        case 65:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-rain', icon);
            break;
            
        case 66:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-temperature-arrow-down', icon);
            break;
            
        case 67:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-temperature-arrow-down', icon);
            break;
            
        case 71:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-meatball', icon);
            break;
            
        case 73:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-meatball', icon);
            break;
            
        case 75:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-meatball', icon);
            break;

        case 77:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-snowflake', icon);
            break;
            
        case 80:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-showers-heavy', icon);
            break;
            
        case 81:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-showers-heavy', icon);
            break;
            
        case 82:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-showers-heavy', icon);
            break;
            
        case 85:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-icicles', icon);
            break;
            
        case 86:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-icicles', icon);
            break;
            
        case 95:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-bolt', icon);
            break;
            
        case 96:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-bolt', icon);
            break;
            
        case 99:
            parent.querySelector(`[data-${selector}]`).innerHTML = setIconValue('fa-cloud-bolt', icon);
            break;
    
        default:
            alert('Invalid value!! ');
            break;
    }
}

function renderCurrentWeather(current) {
    setIcon("current-icon", current.iconCode, "header-icon");
    setValue("current-temp", current.currentTemp);
    setValue("current-high", current.highTemp);
    setValue("current-fl-high", current.highAppTemp);
    setValue("current-wind", current.windSpeed);
    setValue("current-low", current.lowTemp);
    setValue("current-fl-low", current.lowAppTemp);
    setValue("current-precip", current.precip);
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });
const DAY_NUMERIC_FORMATTER = new Intl.DateTimeFormat(undefined, { day: "numeric" });
const MONTH_FORMATTER = new Intl.DateTimeFormat(undefined, { month: "short" });
const YEAR_FORMATTER = new Intl.DateTimeFormat(undefined, { year: "numeric" });
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" });

function renderDailyWeather(daily) {
    const getDaySection = document.querySelector("[data-day-section]");
    const getCardTemplate = document.getElementById("day-card-template");
    getDaySection.innerHTML = '';

    daily.forEach( day => {
        const monthDayYear = `${MONTH_FORMATTER.format(day.timestamp)}. ${DAY_NUMERIC_FORMATTER.format(day.timestamp)}, ${YEAR_FORMATTER.format(day.timestamp)}`;
        const element = getCardTemplate.content.cloneNode(true);
        setValue("temp", day.maxTemp, { parent: element });
        setValue("date",  monthDayYear, { parent: element });
        setValue("day",  DAY_FORMATTER.format(day.timestamp), { parent: element });
        setIcon("icon", day.iconCode, "icon", { parent: element });
        getDaySection.append(element);
    });
}

function renderHourlyWeather(hourly) {
    const getHourSection = document.querySelector("[data-hour-section]");
    const getHourRowTemplate = document.getElementById("hour-row-template");
    getHourSection.innerHTML = '';

    hourly.forEach( hour => {
        const monthDayYear = `${MONTH_FORMATTER.format(hour.timestamp)}. ${DAY_NUMERIC_FORMATTER.format(hour.timestamp)}, ${YEAR_FORMATTER.format(hour.timestamp)}`;
        const element = getHourRowTemplate.content.cloneNode(true);
        setValue("date", monthDayYear, { parent: element });
        setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: element });
        setValue("time", HOUR_FORMATTER.format(hour.timestamp), { parent: element });
        setIcon("icon", hour.iconCode, "icon", { parent: element });
        setValue("temp", hour.temp, { parent: element });
        setValue("fl-temp", hour.appTemp, { parent: element });
        setValue("wind", hour.windSpeed, { parent: element });
        setValue("precip", hour.precip, { parent: element });
        getHourSection.append(element);
    });
}

const btnFilter = () => {
    // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filter");
  filter = input.value.toUpperCase();
  table = document.querySelector(".hour-section");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0].querySelector("#header-title");
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

};


const getCurrentLocation = () =>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,failedToShowPosition);
      } else { 
        alert("Geolocation is not supported by this browser.");
      }
}

getCurrentLocation();

setInterval(() => {
    window.location.reload()
}, 600000);

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getWeather(lat, lat, Intl.DateTimeFormat().resolvedOptions().timeZone).then((data) => {

        let parseCurrent = parseCurrentWeather(data);
        let parseDaily = parseDailyWeather(data);
        let parseHourly = parseHourlyWeather(data);
        renderWeather(parseCurrent, parseDaily, parseHourly);
    
    }).catch((e) => {
        alert("There is an error when fetching data form the API!", e);
        console.log(e);
    });

}

function failedToShowPosition(error) {
    if (error.code === 1) {
        alert("Location access Denied, This app needs location access to function property.");
        console.log(`Error:  ${error.code}`);
    }else if(error.code === 2){
        alert("Location is unavailable.");
        console.log(`Error:  ${error.code}`);
    } else {
        alert("Please try again");
        console.log(`Error:  ${error.code}`);
    }
}

// function myFunction() {
//     document.querySelector('.auto-home').style.display = "block";
// }