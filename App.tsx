import React, { Component, ErrorInfo, useEffect, Suspense, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { FeedbackProvider } from './contexts/FeedbackContext';
import { GalleryProvider } from './contexts/GalleryContext';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { Loader2 } from 'lucide-react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Global Error Boundary
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-[#d4af37]">Something went wrong</h1>
          <p className="text-gray-400 mb-6">The application encountered an unexpected error.</p>
          <pre className="text-xs bg-gray-900 p-4 rounded mb-4 text-left overflow-auto max-w-lg">
            {this.state.error?.message}
          </pre>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#d4af37] text-black font-bold rounded">
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#0f0505] text-gray-100">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const LoadingScreen = () => (
  <div className="min-h-screen bg-[#0f0505] flex items-center justify-center">
    <Loader2 className="animate-spin text-[#d4af37]" size={48} />
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ContentProvider>
          <GalleryProvider>
            <FeedbackProvider>
              <LanguageProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <Suspense fallback={<LoadingScreen />}>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                      </Routes>
                    </Layout>
                  </Suspense>
                </BrowserRouter>
              </LanguageProvider>
            </FeedbackProvider>
          </GalleryProvider>
        </ContentProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;