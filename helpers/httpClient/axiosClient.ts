import axios from 'axios';

const config = {
    baseURL: process.env.BASE_URL
}

/** Creating the instance for axios */
const axiosClient = axios.create(config);

export default axiosClient;
