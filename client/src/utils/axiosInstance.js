import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Define your base API URL here
  timeout: 10000, // Set a timeout for requests (optional)
  withCredentials: true, // Include credentials with requests
});

export default instance;