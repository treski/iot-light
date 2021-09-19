import axios from "axios";

const apiCall = (config) => {
  const {
    baseUrl = "http://52.201.245.140:80/api",
    endpoint,
    method = "get",
    params,
    data,
    headers,
    skipCall = false,
  } = config;

  if (skipCall) {
    return;
  }

  const url = baseUrl + endpoint;

  return axios({
    url,
    method,
    params,
    data,
    headers,
  });
};

export default apiCall;