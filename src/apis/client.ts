import { COOKIE_KEYS, getClientCookie } from "@/utils/clientCookieUtils";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 *  헤더 토큰 추가
 */
API.interceptors.request.use(
  async (config) => {
    const teamCode = getClientCookie(COOKIE_KEYS.TEAM_CODE);

    console.log(teamCode);

    if (teamCode) {
      config.headers["team-code"] = `${teamCode}`;
    }

    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    config.headers["source-location"] = "web";

    // console.log(`${config.url} -- ✈ `, config.data || "");
    return config;
  },
  (error) => Promise.reject(error)
);

export interface BaseResponse<T> {
  detail: string;
  data: T;
}

export const GET = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.get(url, config);
};

export const POST = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.post(url, data, config);
};

export const DELETE = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.delete(url, config);
};

export const PUT = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.put(url, data, config);
};

export const PATCH = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.patch(url, data, config);
};
