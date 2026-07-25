import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import HomePage from './pages/HomePage';
import DestinationsIndexPage from './pages/DestinationsIndexPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import JourneysIndexPage from './pages/JourneysIndexPage';
import JourneyDetailPage from './pages/JourneyDetailPage';
import PhilosophyPage from './pages/PhilosophyPage';
import JournalIndexPage from './pages/JournalIndexPage';
import JournalArticlePage from './pages/JournalArticlePage';
import EnquirePage from './pages/EnquirePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsIndexPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="/journeys" element={<JourneysIndexPage />} />
          <Route path="/journeys/:slug" element={<JourneyDetailPage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/journal" element={<JournalIndexPage />} />
          <Route path="/journal/:slug" element={<JournalArticlePage />} />
          <Route path="/enquire" element={<EnquirePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
