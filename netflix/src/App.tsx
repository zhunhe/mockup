import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import DetailPage from './pages/DetailPage';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import Nav from './components/Nav';
import SearchPage from './pages/SearchPage';

import "./App.css";

const Layout: React.FC = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
