import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CaptureImage from './pages/CaptureImage';
import VoiceInput from './pages/VoiceInput';
import Preferences from './pages/Preferences';
import Results from './pages/Results';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capture" element={<CaptureImage />} />
          <Route path="/voice" element={<VoiceInput />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/results" element={<Results />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;