import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:1001/api',
    withCredentials: true
});

export default instance