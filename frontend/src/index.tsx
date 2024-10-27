import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element with id 'root'");

createRoot(container).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
