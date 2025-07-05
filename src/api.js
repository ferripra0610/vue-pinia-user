import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    const exp = localStorage.getItem("token_exp");
    const now = Math.floor(Date.now() / 1000);
    if (token && exp && now < parseInt(exp)) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;