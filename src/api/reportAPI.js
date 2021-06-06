import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { config, host } from "./config";

export const getReportListAPI = async () => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/report/reportList`, config(token));
}

export const getJournalAPI = async period => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/report/journal`, {params: period, headers: config(token).headers});
}

export const getLedgerAPI = async period => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/report/ledger`, {params: period, headers: config(token).headers});
}

export const getTrialBalanceAPI = async period => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/report/trialBalance`, {params: period, headers: config(token).headers});
}

export const getCashFlowAPI = async period => {
  const token = await AsyncStorage.getItem('@token');
  return axios.get(`${host}/report/cashFlow`, {params: period, headers: config(token).headers});
}