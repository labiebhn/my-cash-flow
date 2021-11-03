import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { config, host } from "./config";

export const getTransactionAPI = async (params) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/transaction/read`, {params, headers: config(token).headers});
}

export const getTransactionPeriodAPI = async (params) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/transaction/read/period`, {params, headers: config(token).headers});
}

export const getTransactionSearchAPI = async (params) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/transaction/read/search`, {params, headers: config(token).headers});
}

export const postTransactionAPI = async (data) => {
  const fd = new FormData();
  Object.keys(data).map(key => {
    fd.append(key, data[key]);
  });
  const token = await AsyncStorage.getItem('@token');
  return axios.post(`${host}/transaction/create`, 
  fd, 
  config(token));
}

export const updateTransactionAPI = async (data) => {
  const fd = new FormData();
  Object.keys(data).map(key => {
    fd.append(key, data[key]);
  });
  const token = await AsyncStorage.getItem('@token');
  return axios.put(`${host}/transaction/update`, 
  fd, 
  config(token));
}

export const deleteTransactionAPI = async (id) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.post(`${host}/transaction/delete`, 
  { id: id },
  config(token),);
}