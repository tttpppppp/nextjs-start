import axios, { type AxiosInstance } from "axios";

class HttpConfig {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export const Http = new HttpConfig().instance;
