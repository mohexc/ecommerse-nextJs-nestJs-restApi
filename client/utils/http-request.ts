import axios from "axios";
const tokenKey = "token";

const httpRequests = axios.create({
    baseURL: 'http://localhost:3001/',
    // headers: {
    //     Authorization: localStorage.getItem(tokenKey),
    // },
});

export default httpRequests