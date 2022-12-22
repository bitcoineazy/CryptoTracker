import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/main/index'
import UserPage from "./pages/personal_cabinet";
import Log_in from "./Components/Log_in";
import Registration from "./Components/Registration";
import Footer from "./Components/footer";
import Header from "./Components/Header";
import AddPortfolio from "./Components/AddPortfolio";

const Home = lazy(() => import('./pages/main'));
const User = lazy(() => import('./pages/personal_cabinet'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/user" element={<User/>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
