import HomePage from './pages/main/index'
import UserPage from "./pages/personal_cabinet";
import Log_in from "./Components/Log_in";
import Registration from "./Components/Registration";
import './App.css';
import Footer from "./Components/footer";
import Header from "./Components/Header";

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/main'));
const User = lazy(() => import('./pages/personal_cabinet'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/user" element={<User/>} />
            <Route path="/header" element={<Header/>}/>
            <Route path="/footer" element={<Footer/>}/>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
