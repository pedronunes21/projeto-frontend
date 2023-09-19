import axios from "axios";

const mail = axios.create({
    baseURL: "https://mail-devlumi.vercel.app/api/email",
})

export default mail;