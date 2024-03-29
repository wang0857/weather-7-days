import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar"
import ColorModeSwitch from "./components/ColorModeSwitch"
import TodaysWeather from "./components/TodaysWeather"
import TempForecast from "./components/TempForecast";


function App() {
  // Get user appearance for default dark mode setting
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
  const [location, setLocation] = useState({});
  const [isError, setIsError] = useState(false);

  function changeMode(mode) {
    setDarkMode(mode)
  }

  function getLocation(location) {
    setLocation(location)
  }
  
  
  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])


  // Examine the location
  function checkIsError(isError) {
    setIsError(isError)
  }


  return (
    <>
    <ColorModeSwitch darkMode={darkMode} changeMode={changeMode} />
    <div className="container">
      <h1 className="text-center">Weather in 7 Days</h1>

      <SearchBar getLocation={getLocation} />
      <div className="grid-container">
          <div>
            <h2 className="text-center text-md-start">Today's Weather</h2>
            <TodaysWeather
              location={location}
              darkMode={darkMode}
              isError={isError}
              checkIsError={checkIsError}
            />
          </div>
          <div>
            <h2 className="text-center text-md-start">Avg. Temperature Forecast in 7 days</h2>
            <TempForecast
              location={location}
              darkMode={darkMode}
              isError={isError}
            />
          </div>
      </div>
    </div>
    </>
  )
}

export default App
