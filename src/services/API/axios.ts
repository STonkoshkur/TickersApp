import { Alert } from 'react-native';

// Services
import Config from 'react-native-config';
import axios, { AxiosRequestConfig } from 'axios';

// Utils
import debounce from 'lodash/debounce';

export const handlerEnabled = (config: AxiosRequestConfig): boolean => {
  return config?.params?.handlerEnabled ?? true;
};

export const showErrorAlert = debounce((title: string, message?: string) => {
  Alert.alert(title, message, [{ text: 'OK' }], {
    cancelable: false,
  });
}, 500);

// create axios instance
const axiosInstance = axios.create({
  baseURL: `${Config.BASE_API_DOMAIN}`,
});

/* request interceptor */
axiosInstance.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    if (handlerEnabled(config)) {
      const authToken = Config.API_AUTH_KEY;

      if (!config.params) {
        config.params = {};
      }

      config.params.apiKey = authToken;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* response interceptor */
axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (responseData = {}) => {
    const { response, message } = responseData;
    const data = response?.data;
    const status = response?.status;

    if (status === 429) {
      showErrorAlert(
        'Ooops!',
        data?.message ??
          "You've exceeded the maximum requests per minute, please wait or upgrade your subscription to continue. https://polygon.io/pricing",
      );
    }

    if (status >= 500) {
      showErrorAlert('Ooops!', 'Server error. Please, try later');
    }

    return Promise.reject({
      data,
      message,
      status,
    });
  },
);

export default axiosInstance;
