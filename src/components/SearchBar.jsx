import { useState, useEffect } from "react"


function SearchBar({getLocation}) {
    const [search, setSearch] = useState('ottawa')
    
    function inputHandler(e) {
        e.preventDefault()

        if(e.key === 'Enter') {
            setSearch(e.target.value.toLowerCase())
            e.target.value = ''
        }
    }

    function submitSearch() {
        const input = document.querySelector('.search-bar input')
        setSearch(input.value)
    }

    useEffect(() => {
        fetch(`https://geocode.xyz?locate=${search}&geoit=json&auth=197640466478387199197x65211`)
        .then(res => res.json())
        .then(data => getLocation(data))
    }, [search])


    return (
        <div className="search-bar">
            <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Type the city's name and hit 'Enter'..."
                onKeyUp={inputHandler}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={submitSearch}></i>
        </div>
    )
}

export default SearchBar