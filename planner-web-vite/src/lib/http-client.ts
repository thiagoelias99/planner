import axios from "axios";

// Create axios client
export const api = axios.create({
    baseURL: `${import.meta.env.VITE_PUBLIC_API_URL}`
})