import axios from "axios";

const apiCall = (config) => {
  const {
    baseUrl = "http://localhost:8080/",
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