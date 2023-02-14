import axios from "axios";
import {BASE_URL} from "../constants/AppConstants";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Upgrade-Insecure-Requests": "1",
};

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(
    config => {
        return { ...config, BASE_URL };
    },
    error => { throw error; }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => { throw error; }
);

export const prepareStatus = (success, message) => ({ success, message });

export const httpClient = {
  postData: async (url, data, params) => await axiosInstance.post(url, data, params, headers),
  getData: async (url, params) => await axiosInstance.get(url, params, headers)
};
