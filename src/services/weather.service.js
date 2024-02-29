import axios from "axios";

const API_URL = "https://www.7timer.info/bin/api.pl?product=civillight&output=json"

class WeatherService {
    get(location) {
        // return axios.get(API_URL + `&lon=${location.longt}&lat=${location.latt}`)
        return axios.get(API_URL + `&lon=${location.lon}&lat=${location.lat}`)
    }
}

export default new WeatherService()