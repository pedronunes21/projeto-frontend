import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://projeto-backend-production.up.railway.app"
})

export default api;