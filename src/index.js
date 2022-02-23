import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CallbackPage from './routes/CallbackPage'


const rootElement = document.getElementById("root")

ReactDOM.render(
<BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart/callback" element={<CallbackPage />} />
    </Routes>
</BrowserRouter>, rootElement);

