import { createContext, useContext } from "react";
export const SplashContext = createContext();
export function useSplash() {
  return useContext(SplashContext);
}
