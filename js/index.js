const cityGeolocation = () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0
    }
    const success = async (pos) => {
        const crd = pos.coords;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${crd.latitude}&lon=${crd.longitude}&appid=3446a5227625c893bb0d62b1c02762cf`
        )

        const data = await response.json();
        console.log(data, "data");
    
        document.querySelector(".temperature_in").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humid-value").innerHTML = data.main.humidity + "%";

        let outTemp;
        if ((Math.round(data.main.temp))<=5) {
            outTemp = 15;
        }
        else if (((Math.round(data.main.temp))>=6) && ((Math.round(data.main.temp))<=10)) {
            outTemp = 10;
        }
        else{
            outTemp = 5;
        }
        document.querySelector(".outdoor-temperature").innerHTML = (Math.round(data.main.temp)) +outTemp+ "°C";

        let humidValue;
        if ((data.main.humidity)<30) {
            humidValue = "Downgraded";
        }
        else if ((data.main.humidity)>60) {
            humidValue = "Increased";
        }
        else {
            humidValue = "Excellent";
        }
        document.querySelector(".air-value").innerHTML = humidValue;

        document.getElementById("imageWather").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    const error = (err) => {
        console.log(err.code + ' ' + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

cityGeolocation();