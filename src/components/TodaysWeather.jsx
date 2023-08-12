import { useState, useEffect } from "react"

import weatherList from '../../weatherList'


function TodaysWeather({location}) {
    const [todaysWeather, setTodaysWeather] = useState({})

    useEffect(() => {
        fetch(`http://www.7timer.info/bin/api.pl?lon=${location.longt}&lat=${location.latt}&product=civillight&output=json`)
        .then(res => res.json())
        .then(data => setTodaysWeather(data.dataseries[0]))
    }, [location])


    return (
        <div className="todaysWeather-container">
            <div className="todaysWeather-location-container">
                {todaysWeather.date &&
                    <p className="todaysWeather-date">
                        {todaysWeather.date.toString().slice(0,4) + '/' + todaysWeather.date.toString().slice(4,6) + '/' + todaysWeather.date.toString().slice(6)}
                    </p>
                }
                <div className="todaysWeather-location">
                    <i className="fa-solid fa-location-dot"></i>
                    {location.standard && <p>{location.standard.city}</p>}
                </div>
            </div>
            <div className="todaysWeather-weather-container">
                <div className="todaysWeather-weather">
                    {weatherList.map(
                        w => w.weather === todaysWeather.weather &&
                        <i className={`fa-solid ${w.icon}`} key={w.id}></i>
                    )}
                    {todaysWeather.temp2m &&
                        <h3>{todaysWeather.temp2m.max} - {todaysWeather.temp2m.min} °C</h3>
                    }
                    {weatherList.map(
                        w => w.weather === todaysWeather.weather &&
                        <p key={w.id}>{w.description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodaysWeather;