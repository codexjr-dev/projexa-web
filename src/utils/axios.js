import axios from 'axios'

const Axios = axios.create({
    baseURL: import.meta.env.DEV
        ? import.meta.env.VITE_API_BASE_URL_DEV
        : import.meta.env.VITE_API_BASE_URL_PROD,
    headers: {
        "Content-type": "application/json"
    },
    // withCredentials: true
});

Axios.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('@jwt');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// Api.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         if (error.response.status === 401 && error.response.data.error !== "Senha inválida" && error.response.data !== "Funcionário já em uso em outro dispositivo") {
//             localStorage.setItem("isAuthenticated", false);
//             window.location.href = "/login";
//         }
//         console.warn(error.response);
//         return Promise.reject(error);
//     }
// )

export default Axios;