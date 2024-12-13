import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
//import { getNetworkStatus } from '../shared/NetworkCheck';
// Create an instance of Axios
const axiosInstance: AxiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(async (config: any) => {
  // Add your authentication logic here, e.g., adding headers

  const token: string | null = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is an authentication error
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
      // Handle logout and redirect to login page
      handleLogout();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const clearLocalStorageExceptKey = (keyToKeep: any) => {
  const valueToKeep = localStorage.getItem(keyToKeep);
  localStorage.clear();
  if (valueToKeep !== null) {
    localStorage.setItem(keyToKeep, valueToKeep);
  }
};

const handleLogout = () => {
  clearLocalStorageExceptKey(['device_token', 'rememberedUserName', 'rememberedPassword', 'app_name', 'app_version']);
};

export default axiosInstance;
