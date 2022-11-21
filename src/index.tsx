import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Help from "./views/Help";
import Withdraw from "./views/Withdraw";
import Privacy from "./views/Privacy";
import TermsOfService from "./views/TermsOfService";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/help" element={<Help/>}/>
                <Route path="/privacy" element={<Privacy/>}/>
                <Route path="/termsofservice" element={<TermsOfService/>}/>
                <Route path="/withdraw" element={<Withdraw/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
