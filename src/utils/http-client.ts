import type { InternalAxiosRequestConfig, AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import { baseURL } from '@/config';

import { history } from './history';

const headers: AxiosRequestConfig['headers'] = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const timeout = 10 * 60 * 1000;

class Axios {
  private instance: AxiosInstance;
  private interceptor: number | null = null;

  constructor() {
    const instance = axios.create({
      baseURL,
      headers,
      timeout,
    });

    // request interceptor
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const access = typeof window !== 'undefined' ? window.localStorage.getItem('jwt') : null;

        if (config.headers) {
          if (access && access !== 'null') {
            config.headers.Authorization = `Bearer ${JSON.parse(access)}`;
          } else {
            delete config.headers.Authorization;
          }
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // response interceptor
    const interceptor = instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        const { response } = error;
        const access = typeof window !== 'undefined' ? window.localStorage.getItem('jwt') : null;

        if (response && response.status === 401) {
          this.signOut();
          if (!access) {
            return Promise.reject(error.response?.data);
          }
        }
      },
    );

    this.instance = instance;
    this.interceptor = interceptor;
  }

  public get Instance(): AxiosInstance {
    return this.instance;
  }

  public useInterceptor() {
    if (this.interceptor === null) {
      const interceptor = this.instance.interceptors.response.use(
        (response: AxiosResponse) => response.data,
        (error: AxiosError) => Promise.reject(error),
      );
      this.interceptor = interceptor;
    }
  }

  public ejectInterceptor() {
    if (this.interceptor !== null) {
      this.instance.interceptors.response.eject(this.interceptor);
      this.interceptor = null;
    }
  }

  private signOut() {
    history.push('/auth/login', { refresh: true });
  }

  public post<T = any, R = T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    this.useInterceptor();
    return this.Instance.post<T, R>(url, data, config);
  }

  public get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R> {
    this.useInterceptor();
    return this.Instance.get<T, R>(url, config);
  }

  public put<T = any, R = T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    this.useInterceptor();
    return this.Instance.put<T, R>(url, data, config);
  }

  public delete<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R> {
    this.useInterceptor();
    return this.Instance.delete(url, config);
  }

  public pull<T = any, R = T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    this.ejectInterceptor();
    return this.Instance.post<T, R>(url, data, config);
  }
}

const HttpClient = new Axios();
export default HttpClient;
