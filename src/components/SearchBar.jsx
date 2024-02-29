import { useState, useEffect } from "react"
import LocationService from "../services/location.service"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


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
        LocationService.get(search)
        .then(data => {
            if(data.data[0]) {
                getLocation(data.data[0])
            } else {
                getLocation({
                    lat: -1,
                    lon: -1
                })

                toast.error("We can't find this place. Please make sure you type the correct city.", {
                    position: "top-center",
                    className: "toast-container",
                    bodyClassName: "toast-body",
                    progressClassName: "toast-progressBar",
                })
            }
        })
        .catch(error => {
            if(error.response) {
                console.log('The status code of error response: ', error.response.status)
                console.log('Response data: ', error.response.data)
            } else if (error.request) {
                console.log('No response received: ', error.request)
            } else {
                console.log('Error message: ', error.message)
            }

            console.log(error.config)
       })
    }, [search])


    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder={
                        document.body.clientWidth > 678 ? 
                        "Type the city's name and hit 'Enter'..." : 
                        "Type the city's name"
                    }
                    onKeyUp={inputHandler}
                />
                <i className="fa-solid fa-magnifying-glass" onClick={submitSearch}></i>
            </div>
            <ToastContainer />
        </>
    )
}

export default SearchBar