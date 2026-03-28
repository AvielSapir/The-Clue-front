import React from 'react';
import Game from './pages/Game';
import Menu from "./pages/Menu.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Menu />} />
          <Route path={"/game"} element={<Game />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;