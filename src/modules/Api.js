import axios from "axios";

// const API = axios.create({ baseURL: 'http://localhost:5000/' });
const API = axios.create({ baseURL: 'https://pocketbotdev9.com' });
// API.interceptors.request.use(config => {
//     if(!config.headers) config.headers = {};
//     config.headers.Authorization = localStorage.getItem('token') || '';
//     return config;
// });

export default API;