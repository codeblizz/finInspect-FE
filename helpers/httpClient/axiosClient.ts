import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const config = {
    baseURL: process.env.BASE_URL
}

/** Creating the instance for axios */
const axiosClient = axios.create(config);

export default axiosClient;
