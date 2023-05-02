import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout/Layout';

import MainPage from './pages/Main/MainPage';
import FavoritePage from './pages/Favorite/FavoritePage';
import VacancyPage from './pages/Vacancy/VacancyPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}>
        <Route
          index
          element={<MainPage />}></Route>
        <Route
          path="/favorite"
          element={<FavoritePage />}></Route>
        <Route
          path="/vacancies/:id"
          element={<VacancyPage />}></Route>
        <Route
          path="/*"
          element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};

export default React.memo(App);
