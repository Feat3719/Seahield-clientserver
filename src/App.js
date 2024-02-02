import React from "react";
import "./App.css";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidenav from "./sidenav/Sidenav";
import BoardList from "./board/BoardList";
import BoardDetail from "./board/BoardDetail";
import BoardUpdate from "./board/BoardUpdate";
import BoardWrite from "./board/BoardWrite";

function App() {
    const main = <Sidenav />;
    return (
        <div>
            <Sidenav />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/boardlist" element={<BoardList />} />
                    <Route path="/boarddetail" element={<BoardDetail />} />
                    <Route path="/boardupdate" element={<BoardUpdate />} />
                    <Route path="/boardwrite" element={<BoardWrite />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
