import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { config, host } from "./config";

export const getAccountCodeAPI = async () => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/accountCode/read`, config(token));
}