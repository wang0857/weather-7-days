import axios from "axios";

// const API_URL = "https://geocode.xyz?geoit=json&auth=197640466478387199197x65211"
const API_URL = "https://geocode.maps.co/search?api_key=65dc24f4d014a567597329nlx357937"

class LocationService {
    // get(location) {
    //     return axios.get(API_URL + `&locate=${location}`)
    //         //    .then(response => {console.log(response)})
    //         //    .catch(error => {
    //         //         if(error.response) {
    //         //             console.log('The status code of error response: ', error.response.status)
    //         //             console.log('Response data: ', error.response.data)
    //         //         } else if (error.request) {
    //         //             console.log('No response received: ', error.request)
    //         //         } else {
    //         //             console.log('Error message: ', error.message)
    //         //         }
    //         //    })
    // }
    get(location) {
        return axios.get(API_URL + `&city=${location}`)
            //    .then(response => {console.log(response)})
            //    .catch(error => {
            //         if(error.response) {
            //             console.log('The status code of error response: ', error.response.status)
            //             console.log('Response data: ', error.response.data)
            //         } else if (error.request) {
            //             console.log('No response received: ', error.request)
            //         } else {
            //             console.log('Error message: ', error.message)
            //         }
            //    })
    }
}

export default new LocationService()