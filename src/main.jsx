


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'


// Custom modules
import router from './routers/routes.jsx'

// Components
import SnackbarProvider from './contexts/SnackbarContext.jsx'


// Css link
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
)
