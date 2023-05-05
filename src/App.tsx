import React from 'react';
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';

import MainPage from 'pages/Main/MainPage';
import FavoritePage from 'pages/Favorite/FavoritePage';
import VacancyPage, { vacancyLoader } from 'pages/Vacancy/VacancyPage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';

import 'App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}>
      <Route
        index
        element={
          <Navigate
            replace
            to="vacancies"
          />
        }
      />

      <Route path="vacancies">
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path=":id"
          loader={vacancyLoader}
          element={<VacancyPage />}
        />
      </Route>

      <Route
        path="favorite"
        element={<FavoritePage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default React.memo(App);
