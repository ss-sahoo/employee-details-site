import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import FirstPage from "./pages/FirstPage";
import React from "react";
import SecondPage from "./pages/SecondPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
