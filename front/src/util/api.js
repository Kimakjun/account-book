import axios from "axios";

const url = "http://localhost:8005/api/v1";

const instance = axios.create({
  baseURL: url,
  timeout: 3000,
  withCredentials: true, // cookie 허용
});

export const getData = (restUrl = "", data = {}) => {
  return instance.get(restUrl, data);
};

export const patchData = (restUrl = "", data = {}) => {
  return instance.patch(restUrl, data);
};

export const putData = (restUrl = "", data = {}) => {
  return instance.put(restUrl, data);
};

export const deleteData = (restUrl = "", data = {}) => {
  return instance.delete(restUrl, data);
};
