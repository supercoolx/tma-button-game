import axios from "axios";

const API = axios.create({ baseURL: 'https://clickminiapp-server.onrender.com/' });
// API.interceptors.request.use(config => {
//     if(!config.headers) config.headers = {};
//     config.headers.Authorization = localStorage.getItem('token') || '';
//     return config;
// });

export default API;