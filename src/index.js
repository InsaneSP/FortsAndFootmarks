import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar/navbar';
import Hero from './Hero/hero';
import Categories from './Categories/categories';
import Featured from './Featured/featured';
import Forts from './Forts/forts';
import Footer from './Footer/footer';
import Login from './Login/login';
import Plan from './Plan/plantrek';
import AboutUs from './AboutUs/aboutus';
import ScrollToTop from './ScrollToTop';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categories />
            <Featured />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/forts/:type" element={<Forts />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
reportWebVitals();
