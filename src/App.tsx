import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner, { useConsent } from './components/CookieBanner';
import Accueil from './pages/Accueil';
import Menu from './pages/Menu';
import AEmporter from './pages/AEmporter';
import LeConcept from './pages/LeConcept';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import CGU from './pages/CGU';
import { Analytics } from "@vercel/analytics/react"

function AnalyticsGate() {
  const consent = useConsent();
  if (consent !== 'accepted') return null;
  return <Analytics />;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"                  element={<Accueil />} />
              <Route path="/menu"              element={<Menu />} />
              <Route path="/a-emporter"        element={<AEmporter />} />
              <Route path="/le-concept"        element={<LeConcept />} />
              <Route path="/reservation"       element={<Reservation />} />
              <Route path="/contact"           element={<Contact />} />
              <Route path="/mentions-legales"  element={<MentionsLegales />} />
              <Route path="/confidentialite"   element={<Confidentialite />} />
              <Route path="/cgu"               element={<CGU />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </BrowserRouter>
      <AnalyticsGate />
    </HelmetProvider>
  );
}

export default App;
