import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config, host } from "./config";

export const getUserByEmailAPI = async email => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/user/email/${email}`, config(token));
}

export const userLoginAPI = data => {
  return axios.post(`${host}/user/login`, data);
}