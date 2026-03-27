import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChannelProvider } from "./contexts/ChannelContext";
import { AppDialogProvider } from "./contexts/AppDialogProvider.jsx";

import { allCh } from "./extData.js";
const STORAGE_KEY = "iframe_links_v1";
localStorage.setItem(STORAGE_KEY, JSON.stringify(allCh));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppDialogProvider>
        <ChannelProvider>
          <App />
        </ChannelProvider>
      </AppDialogProvider>
    </ThemeProvider>
  </StrictMode>,
);
