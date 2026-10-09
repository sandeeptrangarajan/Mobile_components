import React from 'react';
import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PageTransition } from './components/common/PageTransition';
import { HomePage } from './pages/HomePage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandDetailsPage } from './pages/BrandDetailsPage';
import { ModelsPage } from './pages/ModelsPage';
import { ModelDetailsPage } from './pages/ModelDetailsPage';
import { AllComponentsPage } from './pages/AllComponentsPage';
import { ComponentDetailsPage } from './pages/ComponentDetailsPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ComparePage } from './pages/ComparePage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
          <Navbar />
          
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/brand/:brandId" element={<BrandDetailsPage />} />
                <Route path="/models" element={<ModelsPage />} />
                <Route path="/model/:modelId" element={<ModelDetailsPage />} />
                <Route path="/components" element={<AllComponentsPage />} />
                <Route path="/component/:componentId" element={<ComponentDetailsPage />} />
                <Route path="/model/:modelId/component/:componentId" element={<ComponentDetailsPage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* Fallback 404 */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </PageTransition>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
