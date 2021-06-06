import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { config, host } from "./config";

export const getChartSumBalanceAPI = async period => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/chart/sumBalance`, {params: period, headers: config(token).headers});
}