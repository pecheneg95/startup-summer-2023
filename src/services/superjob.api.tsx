import axios, { AxiosResponse } from "axios"

import { Industry, AuthData, UpdatedFilters } from "../types/types";

const LOGIN = process.env.REACT_APP_LOGIN as string;
const PASSWORD = process.env.REACT_APP_PASSWORD as string;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET as string;
const HR = process.env.REACT_APP_HR as string;
const X_SECRET_KEY = process.env.REACT_APP_X_SECRET_KEY as string;
const BASE_URL = 'startup-summer-2023-proxy.onrender.com'

const authService = async () => {
  const getToken = async () => {
    const result: AxiosResponse<AuthData> = await axios({
      method: 'get',
      baseURL: `https://${BASE_URL}/2.0/oauth2/password?login=${LOGIN}&password=${PASSWORD}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&hr=${HR}`,
      headers: {
        'X-Secret-Key': X_SECRET_KEY,
        "X-Api-App-Id": CLIENT_SECRET,
      },
    })

    localStorage.setItem('token', JSON.stringify(result.data))
  }

  if (!localStorage.getItem('token')) {
    await getToken()
  }
}

const getIndustries = async () => {
  async function fetchIndustries() {
    const result: { data: [Industry] } | undefined = await axios({
      method: 'get',
      baseURL: `https://${BASE_URL}/2.0/catalogues/`,
      headers: {
        'X-Secret-Key': X_SECRET_KEY,
        "X-Api-App-Id": CLIENT_SECRET,
      },
    })

    if (result && result.data) {
      localStorage.setItem('industries', JSON.stringify(result.data))
    }
  }

  if (!localStorage.getItem('industries')) {
    await fetchIndustries()
  }

  return JSON.parse(localStorage.getItem('industries') as string)
}

const getVacancies = async (searchParams: UpdatedFilters) => {
  await authService()

  const token: AuthData = JSON.parse(localStorage.getItem('token') as string);
  const params: Record<string, string | number> = { count: 4 }

  for (const param in searchParams) {
    if (!!(searchParams as Record<string, string | number>)[param])
      params[param] = (searchParams as Record<string, string | number>)[param]
  }

  if (!!searchParams.payment_from || !!searchParams.payment_to) {
    params["no_agreement"] = 1
  }

  async function getVacantions() {
    const result = await axios({
      method: 'get',
      baseURL: `https://${BASE_URL}/2.0/vacancies?published=1`,
      headers: {
        'X-Secret-Key': X_SECRET_KEY,
        'X-Api-App-Id': CLIENT_SECRET,
        'Authorization': `Bearer ${token.access_token}`,
      },
      params: params
    })

    return result.data
  }

  return getVacantions()
}

const getVacancy = async (id: number) => {
  await authService()

  const token: AuthData = JSON.parse(localStorage.getItem('token') as string);

  async function getVacancy() {
    const result = await axios({
      method: 'get',
      baseURL: `https://${BASE_URL}/2.0/vacancies/${id}/`,
      headers: {
        'X-Secret-Key': X_SECRET_KEY,
        'X-Api-App-Id': CLIENT_SECRET,
        'Authorization': `Bearer ${token.access_token}`,
      }
    })

    return result.data
  }

  return getVacancy()
}

const getFavorites = async ({ ids, page }: { ids: number[] | null, page: number }) => {
  if (ids === null || ids.length === 0) return null

  await authService()

  const token: AuthData = JSON.parse(localStorage.getItem('token') as string);
  const params: Record<string, number[] | number> = { ids: ids, page: page, count: 4 }

  async function getFavorites() {
    const result = await axios({
      method: 'get',
      baseURL: `https://${BASE_URL}/2.0/vacancies/`,
      headers: {
        'X-Secret-Key': X_SECRET_KEY,
        'X-Api-App-Id': CLIENT_SECRET,
        'Authorization': `Bearer ${token.access_token}`,
      },
      params: params
    })

    return result.data
  }

  return getFavorites()
}

export { authService, getIndustries, getVacancies, getVacancy, getFavorites }
