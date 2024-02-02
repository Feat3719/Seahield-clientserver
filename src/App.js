import React from 'react';
import './App.css';
import Homepage from './home/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidenav from './sidenav/Sidenav';


function App() {

  const main = <Sidenav/>;
  return (
    <div>
      <Sidenav/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          
        </Routes>

      </BrowserRouter>
    </div>

    
  );
}

export default App;
