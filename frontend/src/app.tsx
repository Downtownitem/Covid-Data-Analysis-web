import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";

import Login from "./login";
import Main from "./pages/main/main";
import Register from "./register";
import InitialAnimation from "./pages/initial_animation";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/initial" element={<InitialAnimation />} />
        <Route path="/dashboard/*" element={<Main />} />
      </Routes>
    </AnimatePresence>
  );
}
