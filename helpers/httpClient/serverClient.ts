import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const config = {
    baseURL: publicRuntimeConfig.backendUrl
}

const serverClient = axios.create(config);

export default serverClient;