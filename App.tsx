import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorksPage from './pages/WorksPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useData } from './context/DataContext';
import WorkDetailPage from './pages/WorkDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import NotificationContainer from './components/Notification';
import SetupPage from './pages/SetupPage';

const SiteMetadataManager: React.FC = () => {
  const { siteSettings } = useData();
  
  useEffect(() => {
    document.title = siteSettings.title;
    
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', siteSettings.metaDescription);

    let faviconLink = document.querySelector('link[rel="icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.setAttribute('rel', 'icon');
      document.head.appendChild(faviconLink);
    }
    faviconLink.setAttribute('href', siteSettings.faviconUrl);

  }, [siteSettings]);

  return null;
}

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/setup');

  return (
    <div className="flex flex-col min-h-screen">
      <SiteMetadataManager />
      <NotificationContainer />
      {!isAdminPage && <Header />}
      <main className={`flex-grow ${!isAdminPage ? 'container mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}`}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:workId" element={<WorkDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;