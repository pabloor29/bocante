import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Accueil from './pages/Accueil';
import Menu from './pages/Menu';
import AEmporter from './pages/AEmporter';
import LeConcept from './pages/LeConcept';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"            element={<Accueil />} />
              <Route path="/menu"        element={<Menu />} />
              <Route path="/a-emporter"  element={<AEmporter />} />
              <Route path="/le-concept"  element={<LeConcept />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/contact"     element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
