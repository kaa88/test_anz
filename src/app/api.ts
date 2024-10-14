import axios from "axios";

const API_PATH = "https://jsonplaceholder.typicode.com";

const settings = {
  baseURL: API_PATH,
  timeout: 30000,
};

export const apiInstance = axios.create(settings);
