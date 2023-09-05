import axios from "axios";

const api = axios.create({
    baseURL: "https://pumpi.fly.dev"
})

export default api;