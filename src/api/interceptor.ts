import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { useI18n } from 'vue-i18n';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response;
    return res;
  },
  (error) => {
    const { t } = useI18n();
    Message.error({
      content: t('http.error'),
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
