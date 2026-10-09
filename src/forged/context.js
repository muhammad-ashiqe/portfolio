import { createContext, useContext } from "react";
export const PortfolioContext = createContext(null);
export const usePortfolio = () => useContext(PortfolioContext);
