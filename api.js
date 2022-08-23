import {
  CASH_IN_CONFIG_URL,
  CASH_OUT_JURIDICAL_CONFIG_URL,
  CASH_OUT_NATURAL_CONFIG_URL,
} from "./constants.js"
import fetch from "node-fetch"

const getApiData = async (url) => {
  const response = await fetch(url)
  return await response.json()
}

export const getCashInConfig = () => getApiData(CASH_IN_CONFIG_URL)
export const getCashOutJuridicalConfig = () =>
  getApiData(CASH_OUT_JURIDICAL_CONFIG_URL)
export const getCashOutNaturalConfig = () =>
  getApiData(CASH_OUT_NATURAL_CONFIG_URL)
