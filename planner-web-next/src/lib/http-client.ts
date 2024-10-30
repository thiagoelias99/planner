import axios from "axios";

// Create axios client
export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
})