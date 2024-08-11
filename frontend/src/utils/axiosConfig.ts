import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // URL-ul bazei de date
});

export default axiosInstance;
