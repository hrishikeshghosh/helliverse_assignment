import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import Profile from "./Components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
