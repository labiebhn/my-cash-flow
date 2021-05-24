import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { config, host } from "./config";

export const getJournalAPI = async period => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/report/journal`, {params: period, headers: config(token).headers});
}

export const getJounralListAPI = async () => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/report/journalList`, config(token));
}