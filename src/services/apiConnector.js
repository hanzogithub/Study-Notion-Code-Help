import axios from "axios";

const axiosInstance = axios.create({});

const axiosConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ? bodyData : null,
    headers,
    params,
  });
};

export default axiosConnector;
