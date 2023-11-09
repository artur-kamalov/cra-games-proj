import axios from "axios"

export const myAxios = axios.create({
    baseURL: 'htt://localhost:3000'
})