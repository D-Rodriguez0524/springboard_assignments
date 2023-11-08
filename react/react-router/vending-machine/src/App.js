import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chips from "./snacks/Chips"
import Fish from "./snacks/Fish"
import Soda from "./snacks/Soda"
import VendingMachine from './VendingMachine';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<VendingMachine />} />
          <Route path='/fish' element={<Fish />} />
          <Route path='/chips' element={<Chips />} />
          <Route path='/soda' element={<Soda />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
