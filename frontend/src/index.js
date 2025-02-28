import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar/navbar.jsx';
import Hero from './Hero/hero.jsx';
import Categories from './Categories/categories.jsx';
import Featured from './Featured/featured.jsx';
import Forts from './Forts/forts.jsx';
import Footer from './Footer/footer.jsx';
import Login from './Login/login.jsx';
import Plan from './Plan/plantrek.jsx';
import AboutUs from './AboutUs/aboutus.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import IndividualFort from './IndividualFort/individualfort.jsx';
import PrivacyPolicy from './PrivacyPolicy/privacy.jsx';
import Terms from './Terms/terms.jsx';
import DeleteData from './Delete/delete.jsx';
import ScrollToTopButton from './Scroll/scrolltotopbutton.jsx';
import reportWebVitals from './reportWebVitals.js';
import app from './firebaseConfig.js';
import { AuthProvider } from './Context/authContext.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
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
            <Route path="/forts/" element={<Forts />} />
            <Route path="/forts/:type" element={<Forts />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/fort/:fortName" element={<IndividualFort />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/delete" element={<DeleteData />} />
          </Routes>
          <Footer />
          <ScrollToTopButton /> 
        </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
reportWebVitals();
