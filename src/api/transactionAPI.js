import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { config, host } from "./config";

export const getTransactionAPI = async () => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/transaction/read`, config(token));
}

export const getTransactionPeriodAPI = async () => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/transaction/read/period`, config(token));
}

export const postTransactionAPI = async (data) => {
  const fd = new FormData();
  Object.keys(data).map(key => {
    fd.append(key, data[key]);
  });
  const token = await AsyncStorage.getItem('@token');
  return axios.post(`${host}/transaction/create`, 
  fd, 
  config(token),);
}

export const updateTransactionAPI = async (data) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.put(`${host}/transaction/update/${data.id}`, 
  data, 
  config(token),);
}

export const deleteTransactionAPI = async (id) => {
  const token = await AsyncStorage.getItem('@token');
  return axios.delete(`${host}/transaction/delete/${id}`, 
  config(token),);
}