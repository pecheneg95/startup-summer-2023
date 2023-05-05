import axios, { AxiosResponse } from 'axios';

import {
  Industry,
  AuthData,
  UpdatedFilters,
  Vacancy,
  QueryParams,
} from 'types/types';

const LOGIN = process.env.REACT_APP_LOGIN as string;
const PASSWORD = process.env.REACT_APP_PASSWORD as string;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET as string;
const HR = process.env.REACT_APP_HR as string;
const X_SECRET_KEY = process.env.REACT_APP_X_SECRET_KEY as string;
const BASE_URL = 'startup-summer-2023-proxy.onrender.com';

let authData: AuthData | null = null;
let industries: Industry[] | null = null;

const setToken = async () => {
  const result: AxiosResponse<AuthData> = await axios({
    method: 'get',
    baseURL: `https://${BASE_URL}/2.0/oauth2/password?login=${LOGIN}&password=${PASSWORD}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&hr=${HR}`,
    headers: {
      'X-Secret-Key': X_SECRET_KEY,
      'X-Api-App-Id': CLIENT_SECRET,
    },
  });

  authData = result.data;
};

const checkToken = async () => {
  if (authData === null) {
    await setToken();
  }
};

const makeRequest = async ({
  params,
  path,
}: {
  params?: QueryParams;
  path?: string;
}) => {
  try {
    await checkToken();

    const token = authData?.access_token;

    return axios({
      method: 'get',
      baseURL: `https://${BASE_URL}/2.0/vacancies/${path || ''}`,
      headers: {
        'X-Secret-Key': X_SECRET_KEY,
        'X-Api-App-Id': CLIENT_SECRET,
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
  } catch (err: any) {
    if (err.status === 410) {
      await setToken();
      makeRequest({ params, path });
    } else {
      throw err;
    }
  }
};

const getIndustries = async () => {
  if (!industries) {
    await setIndustries();
  }

  return industries;
};

const setIndustries = async () => {
  const result: { data: Industry[] } | undefined = await axios({
    method: 'get',
    baseURL: `https://${BASE_URL}/2.0/catalogues/`,
    headers: {
      'X-Secret-Key': X_SECRET_KEY,
      'X-Api-App-Id': CLIENT_SECRET,
    },
  });

  if (result && result.data) {
    industries = result.data;
  }
};

const getVacancies = async (searchParams: UpdatedFilters) => {
  const params: QueryParams = { count: 4 };

  for (const param in searchParams) {
    if (!!(searchParams as QueryParams)[param])
      params[param] = (searchParams as QueryParams)[param];
  }

  if (searchParams.payment_from || searchParams.payment_to) {
    params['no_agreement'] = 1;
  }

  const result:
    | AxiosResponse<{ objects: Vacancy[]; total: number }>
    | undefined = await makeRequest({
    params: params,
  });

  if (result && result.data) {
    return result.data;
  }
};

const getVacancy = async (id: number) => {
  try {
    await checkToken();

    const result = await makeRequest({
      path: `${id}`,
    });

    if (result && result.data) {
      return result.data as Vacancy;
    }

    return null;
  } catch (error: any) {
    return null;
  }
};

const getFavorites = async ({
  ids,
  page,
}: {
  ids: number[] | null;
  page: number;
}) => {
  await checkToken();

  if (ids === null || ids.length === 0) {
    return null;
  }

  const params: QueryParams = {
    ids: ids,
    page: page,
    count: 4,
  };

  const result = await makeRequest({
    params: params,
  });

  if (result && result.data && result.data.objects.length > 0) {
    return result.data;
  }

  return null;
};

const superjobService = {
  setToken,
  getIndustries,
  setIndustries,
  getVacancies,
  getVacancy,
  getFavorites,
};

export default superjobService;
