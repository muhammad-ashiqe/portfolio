import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SplashProvider } from "./context/SplashContext.jsx";

createRoot(document.getElementById("root")).render(
  <SplashProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SplashProvider>
);
