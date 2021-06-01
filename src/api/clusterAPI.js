import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { config, host } from "./config";

export const getClusterAPI = async () => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/cluster/read`, {headers: config(token).headers});
}