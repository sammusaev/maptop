import React from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Find from './pages/Find';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/'     element={<Home/>}> </Route>
          <Route path='/find' element={<Find/>}> </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;