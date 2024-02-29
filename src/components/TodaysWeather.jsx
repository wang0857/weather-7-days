import { useState, useEffect } from "react"
import WeatherService from "../services/weather.service"
import weatherList from '../../weatherList'
import { PacmanLoader } from 'react-spinners'


function TodaysWeather({location, darkMode, isError, checkIsError}) {
    const [todaysWeather, setTodaysWeather] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true)

        if (location.lat === -1) {
            // setIsError(true)
            checkIsError(true)
            setIsLoading(false)
            
            return
        } else {
            checkIsError(false)

            WeatherService.get(location).then(data => {
                setTodaysWeather(data.data.dataseries[0])
                setIsLoading(false)
            })
        }
    }, [location])


    return (
        <div className="todaysWeather-container">
            {isLoading ?
                <PacmanLoader
                    color={darkMode ? 'hsl(0, 0%, 80%)' : '#001B48'}
                    loading={isLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> :
                isError ? 
                <>
                    <h3 className="text-center">We can't find this place.</h3>
                    <p className="text-center">Please check the city's name and try again.</p>
                </> :
                <>
                    <div className="todaysWeather-location-container">
                        {todaysWeather.date &&
                            <p className="todaysWeather-date">
                                {todaysWeather.date.toString().slice(0,4) + '/' + todaysWeather.date.toString().slice(4,6) + '/' + todaysWeather.date.toString().slice(6)}
                            </p>
                        }
                        <div className="todaysWeather-location">
                            <i className="fa-solid fa-location-dot"></i>
                            {location.display_name ? 
                                <p>{location.display_name}</p> : 
                                <p>Place not found</p>
                            }
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
                </>
            }
        </div>
    )
}

export default TodaysWeather;