type Filters = {
  keyword: string;
  catalogues: number | null;
  payment_from: number;
  payment_to: number;
  page: number;
};

type UpdatedFilters = Partial<Filters>;

type Industry = {
  title: string;
  key: number;
};

type AuthData = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  reg_user_resumes_count: number;
  token_type: string;
  ttl: number;
};

type Vacancy = {
  id: number;
  profession: string;
  firm_name: string;
  town: {
    title: string;
  };
  catalogues: [{ title: string }];
  type_of_work: { title: string };
  payment: number;
  payment_to: number;
  payment_from: number;
  currency: string;
  vacancyRichText: string;
};

type Salary = {
  payment?: number;
  payment_from?: number;
  payment_to?: number;
  currency?: string;
};

export type { Filters, UpdatedFilters, Industry, AuthData, Vacancy, Salary };
