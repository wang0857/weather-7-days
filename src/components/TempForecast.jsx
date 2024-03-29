import { useState, useEffect } from "react"
import WeatherService from "../services/weather.service";
import weatherList from '../../weatherList'

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2';
import { PacmanLoader } from "react-spinners";

// Activate the ChartJS
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler
)

function TempForecast({location, darkMode, isError}) {
    const [sevenWeathers, setSevenWeathers] = useState([])
    const [avgTemp, setAvgTemp] = useState([])
    const [sevenDays, setSevenDays] = useState([])
    const [iconObjs, setIconObjs] = useState([])
    const [dayIcons, setDayIcons] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    
    // Line Chart
    
    // Get FA icons and change the font type 
    ChartJS.defaults.font.family= "'Poppins', sans-serif, 'FontAwesome'"

    const data = {
        labels: dayIcons,
        datasets: [{
            label: 'Avg. Temperature(°C)',
            data: avgTemp,
            color: darkMode ? 'hsl(0, 0%, 80%)' : '#001B48',
            borderColor: darkMode ? 'hsl(0, 0%, 80%)' : '#001B48',
            backgroundColor: (context) => {
                const lightBgColor = [
                    'rgba(2, 69, 122, 0.35)',
                    'rgba(1, 35, 61, 0)'
                ]

                const darkBgColor = [
                    'rgba(158, 186, 243, 0.6)',
                    'rgba(1, 35, 61, 0)'
                ]

                if(!context.chart.chartArea) {
                    return
                }
                
                const {ctx, data, chartArea: {top, bottom}} = context.chart
                const gradientBg = ctx.createLinearGradient(0, top, 0, bottom) // Original: x, y, w, h
                // x for horizontal; y for vertical; w for width; h for height
                gradientBg.addColorStop(0, darkMode ? darkBgColor[0] : lightBgColor[0]) 
                gradientBg.addColorStop(1, darkMode ? darkBgColor[1] : lightBgColor[1])

                return gradientBg
            },
            tension: 0.4,
            fill: true,
            borderWidth: 1,
            maintainAspectRatio: false,
            // responsive: true
        }]
    }

    // Customized X and Y Axis and Legend Colors
    const options = {
        plugins: {
            legend: {
                labels: {
                    color: darkMode ? 'hsl(0, 0%, 80%)' : '#001B48'
                }
            }
        },
        layout:{
            padding: {
                bottom: 30
            }
        },
        scales: {
            y: {
                grid: {
                    color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(112, 112, 112, 0.2)'
                },
                ticks: {
                    color: darkMode ? 'hsl(0, 0%, 80%)' : '#001B48'
                }
            },
            x: {
                grid: {
                    color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(112, 112, 112, 0.2)'
                },
                ticks: {
                    color: darkMode ? 'hsl(0, 0%, 80%)' : '#001B48'
                }
            }
        }
    }

    // Get weather in 7 days
    useEffect(() => {
        setIsLoading(true)
        // fetch(`https://www.7timer.info/bin/api.pl?lon=${location.longt}&lat=${location.latt}&product=civillight&output=json`)
        // .then(res => res.json())
        // .then(data => setSevenWeathers(data.dataseries))
        WeatherService.get(location).then(data => {
            setSevenWeathers(data.data.dataseries)
            setIsLoading(false)
        })
    }, [location])

    // Set the 7 days and the average temperatures
    useEffect(() => {
        setAvgTemp(
            sevenWeathers.map(
                weather => (weather.temp2m.max + weather.temp2m.min) / 2
            )
        )
        setSevenDays(
            sevenWeathers.map(
                weather => new Date(
                    weather.date.toString().slice(0,4) + '/' + weather.date.toString().slice(4,6) + '/' + weather.date.toString().slice(6)
                    ).toLocaleString("en", { weekday: "short" })
            )
        )
        setIconObjs(
            sevenWeathers.map(
                weather => weatherList.filter(
                    w => w.weather === weather.weather
                )
            )
        )
        setDayIcons(
            iconObjs.map(
                // @Hack: If you want to set break line in the labels,
                // Use 'Inline Array' (ex: [Line 1, Line 2]) for each item in an Array
                (icon, index) => 
                    [`${sevenDays[index]}`, `${icon[0].unicode}`]
            )
        )
    }, [sevenWeathers])


    return (
        <div className="tempForecast-container">
            {isLoading ?
                <PacmanLoader
                    color={darkMode ? 'hsl(0, 0%, 80%)' : '#001B48'}
                    loading={isLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> :
                isError ? 
                <div className="d-flex flex-column align-items-center">
                    <i className="fa-solid fa-face-dizzy fs-2"></i>
                    <p className="mt-3 text-center"> Starving... Feed me data.</p>
                </div> :
                <div className="tempForecast-container-lineChart">
                    <Line
                        data={data}
                        options={options}
                    />
                </div>
            }
        </div>
    )
}

export default TempForecast