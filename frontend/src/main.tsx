import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from './context/AppContext.tsx';
import "leaflet/dist/leaflet.css";
import { SocketProvider } from "./context/SocketContext.tsx";

export const authService = "https://zaikaar-auth.onrender.com";
export const restaurantService = "https://restaurant-service-472j.onrender.com";
export const utilsService = "https://zaikaar-utils.onrender.com";
export const realtimeService = "https://realtime-service-en04.onrender.com";
export const riderService = "https://rider-service-k642.onrender.com";
export const adminService = "https://zaikaar-admin.onrender.com";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="727593183197-22ccneom3iilep4iard8nkturv12s89l.apps.googleusercontent.com">
      <AppProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
