import axios from 'axios'

export const weatherAxios = axios.create({
    baseURL:'https://api.open-meteo.com/v1/forecast'
})