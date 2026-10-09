import { createContext, useState, useContext } from 'react';

const SplashContext = createContext();

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

export function useSplash() {
  return useContext(SplashContext);
}