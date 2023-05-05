import React, { Suspense } from 'react';
import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from 'react-router-dom';

import VacancyLayout from './Vacancy';
import Loader from 'components/Loader/Loader';

import superjobService from 'services/superjob.service';

import { Vacancy } from 'types/types';

const VacancyPage = () => {
  const { vacancy } = useLoaderData() as { vacancy: Vacancy | null };

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={vacancy}>
        <VacancyLayout />
      </Await>
    </Suspense>
  );
};

export const vacancyLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);
  const vacancy = Number.isNaN(id) ? null : superjobService.getVacancy(id);

  return defer({
    vacancy: vacancy,
    id,
  });
};

export default React.memo(VacancyPage);
