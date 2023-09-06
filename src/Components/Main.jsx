import React, { useEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

function Main() {
  const [weather, setWeather] = useState({
    temperature: 0,
    cityName: "",
    condition: "",
    humidity: 0,
    windSpeed: 0,
  });
  const apikey = "b66027738c1ef56d2f378034aa0c688d";
  const apiurl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const [query, setQuery] = useState("Gajuwaka");
  const input = useRef(null);
  const [isValid, setIsValid] = useState("invisible");
  const [imgsrc, setImgsrc] = useState("https://i.ibb.co/xsskz1h/clear.png");

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(`${apiurl}${query}&appid=${apikey}`);
      const data = await response.json();

      if (response.status === 404) setIsValid("visible");
      else setIsValid("invisible");

      if (response.status !== 404)
        setWeather({
          temperature: data.main.temp,
          cityName: data.name,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
    }

    if (weather.condition === "Clouds")
      setImgsrc("https://i.ibb.co/2YwZgr6/clouds.png");
    else if (weather.condition === "Rain")
      setImgsrc("https://i.ibb.co/JHy2NNS/rain.png");
    else if (weather.condition === "Haze")
      setImgsrc("https://i.ibb.co/mGGpXJs/mist.png");
    else if (weather.condition === "Clear")
      setImgsrc("https://i.ibb.co/xsskz1h/clear.png");
    else if (weather.condition === "Snow")
      setImgsrc("https://i.ibb.co/gWhq4GK/snow.png");

    fetchWeather();
    console.log("Rendering again");
  }, [query, weather.condition]);
  return (
    <div className="bg-gradient-to-tr from-green-500 via-blue-600 to-lime-400 min-h-screen  px-24 grid place-items-center">
      <div className=" bg-white lg:w-2/4 md:w-3/4 max-w-screen w-80 h-11/12 p-10 bg-opacity-20 rounded-lg">
        <h1 className="text-white text-4xl font-bold mb-10 text-center">
          Weather App
        </h1>
        <div id="head">
          <div className="flex items-center justify-center  ">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setQuery(input.current.value);
                  input.current.value = "";
                }
              }}
              placeholder="Enter city name"
              ref={input}
              type="text"
              className="bg-white  rounded-3xl w-11/12 lg:w-8/12 px-6 py-2 outline-none focus:shadow-lg shadow-black"
            />
            <BiSearchAlt
              onClick={() => {
                setQuery(input.current.value);
                input.current.value = "";
              }}
              className="text-2xl relative right-9 cursor-pointer text-zinc-800"
            />
          </div>
          <div className="border text-center invisible">
            <p className={isValid}>Invalid location</p>
          </div>
          <div id="content" className=" flex flex-col items-center gap-5">
            <img src={imgsrc} alt="clear" className="w-36" />
            <h1 className="text-4xl text-white font-semibold">
              {`${weather.temperature} °C`}
            </h1>
            <h2 className="text-2xl text-white font-medium">
              {weather.condition}
            </h2>
            <h2 className="text-2xl text-white font-medium">
              {weather.cityName}
            </h2>

            <div className="flex gap-4 items-center">
              <img
                src={require("../Assets/images/humidity.png")}
                alt=""
                className="w-6 h-6"
              />

              <p className="text-white font-medium text-lg">{`${weather.humidity}% Humidity`}</p>

              <img
                src={require("../Assets/images/wind.png")}
                alt=""
                className="w-6 h-6"
              />

              <p className="text-white font-medium text-lg">{`${weather.windSpeed} km/hr wind-speed`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
