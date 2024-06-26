import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast"
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
