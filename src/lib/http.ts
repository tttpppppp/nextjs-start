import axios from "axios";
import type { AxiosInstance } from "axios";
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
  }
}
export const Http = new HttpConfig().instance;
