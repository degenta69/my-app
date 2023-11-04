import React from "react";
import "./App.css";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={"*"} element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
