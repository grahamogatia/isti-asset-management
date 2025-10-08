import axios, { AxiosError } from "axios"
import { toast } from "sonner"

const url = import.meta.env.VITE_SERVER 
const api = axios.create({ baseURL: url, timeout: 60000 })
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token") // Check if may token
//     if (!token) throw new Error("Token not found!");
//     config.headers.Authorization = `Bearer ${token}`
//     return config;
// }, (error: AxiosError) => Promise.reject(error.message))

api.interceptors.response.use((res) => res, (error: AxiosError) => {
    toast.error(error.message === "Network Error" ? "The host cannot connect to the server ..." : error.message)
    return Promise.reject(error.message)
})

export default api;
