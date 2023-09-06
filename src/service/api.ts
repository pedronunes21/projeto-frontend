import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000"
    baseURL: "https://pumpi.fly.dev"
})

export default api;