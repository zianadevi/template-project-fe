export const authHeaderInterceptor = (config) => {
    // Sesuaikan dengan PATH login
    if (config.url !== '/api/login') {
        const token = window.localStorage.getItem('token')
        config.headers.Authorization = token;
    }
    return config;
}