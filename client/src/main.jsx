import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import { UserContextProvider } from './context/UserContextProvider.jsx';

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextProvider>
)
