import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IApiResponse<T> {
  data: T;
}

const API_URL = 'https://my-json-server.typicode.com';

export async function get<T = any>(url: string, params?: any, headers?: any): Promise<AxiosResponse<IApiResponse<T>>> {
  return await request({ url, method: 'GET', params, headers });
}

async function handleError(err: AxiosError) {
  return console.log(err);
}

async function request(options: AxiosRequestConfig): Promise<AxiosResponse<any>> {
  try {
    return await axios({
      ...options,
      baseURL: API_URL,
      headers: {
        'Content-type': 'application/json',
        ...options.headers
      }
    });
  } catch (err) {
    return (await handleError(err as any)) as any;
  }
}

export const agent = { get };
