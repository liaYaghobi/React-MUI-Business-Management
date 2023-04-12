import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';

import React, { useState, useEffect } from "react";
// ----------------------------------------------------------------------

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http:localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
