import "./App.css";
import Homepage from "./home/Homepage";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignupVer from "./signupVer/SignupVer";
import Signup from "./signup/Signup";
import Signin from "./signin/Signin";
import axios from "axios";
import IdFind from "./find/IdFind";
import Mypage from "./mypage/Mypage.jsx";
import Intro from "./intro/Intro";
import { AnimatePresence } from "framer-motion";

axios.defaults.baseURL = "https://devfeat.com";

function App() {
    return (
        <>
            <BrowserRouter>
                {/* `useLocation`을 사용하기 위한 컴포넌트 분리 */}
                <AppContent />
            </BrowserRouter>
        </>
    );
}

function AppContent() {
    const location = useLocation(); // `useLocation`은 이제 `<BrowserRouter>` 내부에서 호출됩니다.

    return (
        <AnimatePresence mode="current">
            {" "}
            {/* exitBeforeEnter를 mode='wait'로 변경 */}
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Intro />} />
                <Route path="/map" element={<Homepage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signupver" element={<SignupVer />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/idfind" element={<IdFind />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/board" element={<Board />} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
