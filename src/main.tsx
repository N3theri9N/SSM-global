// import React from 'react'
import ReactDOM from "react-dom/client";
// import App from './App'
import SSMGlobalApp from "./SSMGlobalApp";
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SSMGlobalApp />} />
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>,
);
