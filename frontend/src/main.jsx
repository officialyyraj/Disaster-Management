import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/Home.jsx'
import { Reports } from './pages/reports.jsx'
import 'leaflet/dist/leaflet.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
const router= createBrowserRouter([
  {path:"/",element:<Home />},
  {path:"/reports",element:<Reports />}
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
