import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hacer scroll top 0 cuando cambia la ubicación (ruta)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop