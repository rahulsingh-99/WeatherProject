const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

const getInfo = async (event) => {
  event.preventDefault();

  let cityValue = cityName.value;

  if (cityValue === "") {
    city_name.innerText = "Please enter the city name";
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=512ad6f3c44a148bd2a52a9da20eeaa2`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerText = arrData[0].main.temp + ` ° C`;
      temp_status.innerText = arrData[0].weather[0].main;

      let tempStatus = arrData[0].weather[0].main;

      //! conditions to check sunny or cloudy

      if (tempStatus === "Clear") {
        temp_status.innerHTML = `<i class="far fa-sun" style='color:#eccc68;'></i>`;
      } else if (tempStatus === "Clouds") {
        temp_status.innerHTML = `<i class="fas fa-cloud" style='color:#f1f2f6;' ></i>`;
      } else if (tempStatus === "Rain") {
        temp_status.innerHTML = `<i class="fas fa-cloud-rain" style='color:#a4b0be;'></i>`;
      } else {
        temp_status.innerHTML = `<i class="fas fa-cloud" style='color:#f1f2f6;' ></i>`;
      }
    } catch {
      city_name.innerText = "Please enter the city name properly";
      temp_status.innerText = "";
      temp.innerText = "";
    }
  }
};

submitBtn.addEventListener("click", getInfo);
