import axios from "axios";
import type { AxiosInstance } from "axios";
class HttpConfig {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
      timeout: 1000,
      headers: { "X-Custom-Header": "foobar" },
    });
  }
}

export const Http = new HttpConfig().instance;
