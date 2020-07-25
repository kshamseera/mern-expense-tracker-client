import axios from 'axios'

//create axios instance
export default axios.create({
    baseURL: 'https://obscure-basin-70004.herokuapp.com/',
    timeout: 5000,
    withCredentials: true
    // 'https://obscure-basin-70004.herokuapp.com/'
})