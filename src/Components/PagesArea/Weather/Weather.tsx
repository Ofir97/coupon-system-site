import axios from "axios";
import { useEffect, useState } from "react";
import { Coordinates } from "../../../Models/weather/Coordinates";
import { WeatherApi } from "../../../Models/weather/WeatherApi";
import Avatar from "../../SharedArea/Avatar/Avatar";
import "./Weather.css";

function Weather(): JSX.Element {

    const numOfRegions = 8;
    const info: WeatherApi[] = [];
    const [weatherInfo, setWeatherInfo] = useState(info);
    const [rerender, setRerender] = useState(true);

    const key = '49720f8d37684698a8eb7990686afd7d';

    const callWeatherApi = (coordinates: Coordinates) => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`)

            .then(response => {
                const apiResponse = response.data;
                const weather: WeatherApi = new WeatherApi();

                console.log(new Date(apiResponse?.current?.sunrise * 1000));
                weather.location = coordinates?.region;
                weather.temp = Math.round(apiResponse?.current?.temp);

                weather.cloudCover = apiResponse?.current?.clouds;
                weather.humidity = apiResponse?.current?.humidity;
                weather._iconUrl = `https://openweathermap.org/img/wn/${apiResponse?.current?.weather[0]?.icon}@2x.png`;
                weather._description = apiResponse?.current?.weather[0]?.description;
                weather._lat = coordinates?.lat;

                info.push(weather);

                if (weatherInfo.length == numOfRegions) {
                    setWeatherInfo(info);
                    setRerender(!rerender);
                }

            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        callWeatherApi(new Coordinates('Tel Aviv', 32.109333, 34.855499));
        callWeatherApi(new Coordinates('New York', 40.730610, -73.935242)); 
        callWeatherApi(new Coordinates('New Delhi', 28.64480, 77.216721));
        callWeatherApi(new Coordinates('Moscow', 55.751244, 37.618423));
        callWeatherApi(new Coordinates('Bangkok', 13.736717, 100.523186));
        callWeatherApi(new Coordinates('London', 51.509865, -0.118092));
        callWeatherApi(new Coordinates('Sydney', -33.865143, 151.209900));
        callWeatherApi(new Coordinates('Paris', 48.864716, 	2.349014));

    }, [])

    return (
        <div className="Weather">
            {weatherInfo?.length > 0 && <><h2 className="display-5">What's the weather now?</h2>
                <div className="row">
                    {weatherInfo.map(weather => {
                        return [
                            <div className="card" style={{ width: "19rem" }} key={weather?._lat.toString()} >
                                <h4 className="card-title card-header">{weather?.location}</h4>
                                <div className="img-container"><Avatar className="card-img-top weather-img" uuid={weather._iconUrl?.toString()} /></div>
                                <div className="card-body">
                                    <h5 className="card-desc">{weather?.description}</h5>
                                    <h4 className="card-temp">{weather?.temp}°</h4>
                                    <h6 className="card-details">Cloud Cover: {weather?.cloudCover}%</h6>
                                    <h6 className="card-details">Humidity: {weather?.humidity}%</h6>
                                </div>
                            </div>
                        ]
                    })}
                </div></>}
        </div >
    );
}

export default Weather;
