import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/Home.jsx'
import { Reports } from './pages/reports.jsx'
import 'leaflet/dist/leaflet.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { EmptyState } from './pages/EmptyState'
import { RateLimit } from './pages/RateLimit'
import { ServerError } from './pages/ServerError'
import { Offline } from './pages/Offline'
import ErrorBoundary from './components/ErrorBoundary'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/reports', element: <Reports /> },
  { path: '/empty', element: <EmptyState /> },
  { path: '/404', element: <NotFound /> },
  { path: '/rate-limit', element: <RateLimit /> },
  { path: '/error', element: <ServerError /> },
  { path: '/offline', element: <Offline /> },
  { path: '*', element: <NotFound /> },
])

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <Offline />;
  }

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
