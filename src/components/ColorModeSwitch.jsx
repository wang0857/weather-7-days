function ColorModeSwitch({darkMode, changeMode}) {       
    function turnMode() {
        changeMode(!darkMode)
    }

    return (
        <div className="form-check form-switch colorMode-switch-container">
            <div className="colorMode-switch-input">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="colorMode"
                    onChange={turnMode}
                    checked={darkMode ? true : false}
                />
                <label
                    className="colorMode-switch-label"
                    htmlFor="colorMode"
                    style={darkMode ? {left: '10px'} : {left: '42px'}}
                >
                    {darkMode ? 'Light' : 'Dark'}
                </label>
            </div>
        </div>
    )
}

export default ColorModeSwitch