import axios from "axios";
import {useRouter} from "vue-router";
import router from '@/router/index.js'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {Content_Type: 'application/json'}
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Redirige a la página de inicio de sesión
            localStorage.removeItem('AUTH_TOKEN');
            router.push({name: 'login'});
        }
        return Promise.reject(error);
    }
);

export default api;