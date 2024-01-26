import axios from "axios";
import type {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

import {
  localStg,
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData,
} from "@/utils";
import { handleRefreshToken } from "./helpers";
import { StorageKey } from "@/utils/storage/type";

type RefreshRequestQueue = (config: AxiosRequestConfig) => void;

export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: Service.BackendResultConfig;

  isRefreshing: boolean;

  retryQueues: RefreshRequestQueue[];

  /**
   *
   * @param axiosConfig -
   * @param backendConfig -
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: "code",
      dataKey: "data",
      msgKey: "message",
      successCode: 200,
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
    this.isRefreshing = false;
    this.retryQueues = [];
  }

  /**   */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          //
          const contentType = handleConfig.headers[
            "Content-Type"
          ] as UnionKey.ContentType;
          handleConfig.data = await transformRequestData(
            handleConfig.data,
            contentType
          );
          //
          handleConfig.headers.Authorization =
            localStg.get(StorageKey.token) || "";
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    this.instance.interceptors.response.use(
      (async (response) => {
        const { status, config } = response;
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode } = this.backendConfig;
          //
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey]);
          }

          //Kiểm tra điều kiện refresh token
          const isExpired = false;
          if (isExpired) {
            //
            const originRequest = new Promise((resolve) => {
              this.retryQueues.push((refreshConfig: AxiosRequestConfig) => {
                config.headers.Authorization =
                  refreshConfig.headers?.Authorization;
                resolve(this.instance.request(config));
              });
            });

            if (!this.isRefreshing) {
              this.isRefreshing = true;
              const refreshConfig = await handleRefreshToken(response.config);
              if (refreshConfig) {
                this.retryQueues.map((cb) => cb(refreshConfig));
              }
              this.retryQueues = [];
              this.isRefreshing = false;
            }
            return originRequest;
          }

          const error = handleBackendError(backend, this.backendConfig);
          return handleServiceResult(error, null);
        }
        const error = handleResponseError(response);
        return handleServiceResult(error, null);
      }) as (
        response: AxiosResponse<any, any>
      ) => Promise<AxiosResponse<any, any>>,
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
