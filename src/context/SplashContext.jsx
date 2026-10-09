import { SplashContext } from "./splash-context";
import PropTypes from "prop-types";
import { useState } from 'react';



export function SplashProvider({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SplashContext.Provider value={{ 
      showSplash, 
      setShowSplash, 
      isVisible, 
      setIsVisible 
    }}>
      {children}
    </SplashContext.Provider>
  );
}

SplashProvider.propTypes = { children: PropTypes.node };
