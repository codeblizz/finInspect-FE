import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const config = {
  baseURL: publicRuntimeConfig.backendUrl,
};

const serverClient = axios.create(config);

// const authInterceptor = async (config: any) => {
//   let token: string | null;
//   config.baseURL = publicRuntimeConfig.backendUrl;
//   if (typeof window !== undefined) {
//     token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//   }
//   return config;
// };

// serverClient.interceptors.request.use(authInterceptor);

export default serverClient;
