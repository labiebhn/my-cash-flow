import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config, host } from "./config";

export const getUserAPI = async () => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/user`, config(token));
}

export const getUserByEmailAPI = async email => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/user/email/${email}`, config(token));
}

export const putUserAPI = async (data) => {
  const fd = new FormData();
  Object.keys(data).map(key => {
    fd.append(key, data[key]);
  });

  const token = await AsyncStorage.getItem('@token');
  return axios.put(`${host}/user/update/${data.id}`, fd, config(token));
}

export const putPasswordAPI = async (id, data) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.put(`${host}/user/password/${id}`, data, config(token));
}

export const deleteUserAPI = async (email) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.delete(`${host}/user/delete/${email}`, config(token));
}

export const userLoginAPI = data => {
  return axios.post(`${host}/user/login`, data);
}

export const registerUserAPI = async data => {
  const token = await AsyncStorage.getItem('@token');
  return axios.post(`${host}/user/register`, data, config(token));
}
