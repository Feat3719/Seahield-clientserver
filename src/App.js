import React from "react";
import "./App.css";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidenav from "./sidenav/Sidenav";
import Board from "./board/Board";

function App() {
    const main = <Sidenav />;
    return (
        <div>
            <Sidenav />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/board" element={<Board />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
