import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AuthContextArea } from './context/useAuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
    <AuthContextArea>
    <SocketContextProvider>
       <App />
    </SocketContextProvider>
    </AuthContextArea>
    </HashRouter>
  </React.StrictMode>,
)
