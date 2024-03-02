import "./App.css";
import Homepage from "./home/Homepage";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignupVer from "./signupVer/SignupVer";
import Signup from "./signup/Signup";
import Signin from "./signin/Signin";
import axios from "axios";
import IdFind from "./find/IdFind";
import BoardDetail from "./board/BoardDetail";
import BoardUpdate from "./board/BoardUpdate";
import BoardWrite from "./board/BoardWrite";
import BoardTab from "./board/BoardTab";
import MypageRegular from "./mypage/MypageRegular";
import MyEditPrev from "./mypage/MyEditPrev";
import Intro from "./intro/Intro";
import { AnimatePresence } from "framer-motion";
import Contract from "./contract/Contract";
import AdminPage from "./adminpage/AdminPage";
import ContractVer from "./contract/ContractVer";
import CompanyInfo from "./contract/CompanyInfo";
import Announcement from "./announce/Announcement";
import AnnounceDetail from "./announce/AnnounceDetail";
import ProtectedRoute from "./reducers/ProtectedRoute";
import PublicOnlyRoute from "./reducers/PublicOnlyRoute";
import AdminOnlyRoute from "./reducers/AdminOnlyRoute";
import BusinessOnlyRoute from "./reducers/BusinessOnlyRoute";
import Monitoring from "./monitoring/Monitoring";
import AnnounceWrite from "./announce/AnnounceWrite";

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
  const location = useLocation(); // useLocation은 이제 <BrowserRouter> 내부에서 호출됩니다.

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 공개 접근 가능 라우트 */}
        <Route path="/" element={<Intro />} />
        <Route path="/map" element={<Homepage />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/boardtab" element={<BoardTab />} />
        <Route path="/announce" element={<Announcement />} />
        <Route path="/announcedetail/:announceId" element={<AnnounceDetail />} />
        <Route path="/announcewrite/" element={<AnnounceWrite />} />
        <Route path="/boarddetail/:id" element={<BoardDetail />} />

        {/* 로그인한 사용자만 접근 가능 라우트 */}
        <Route
          path="/boardupdate/:id"
          element={
            <ProtectedRoute>
              <BoardUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boardwrite"
          element={
            <ProtectedRoute>
              <BoardWrite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypageregular"
          element={
            <ProtectedRoute>
              <MypageRegular />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myeditprev"
          element={
            <ProtectedRoute>
              <MyEditPrev />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contract"
          element={
            <ProtectedRoute>
              <BusinessOnlyRoute>
                <Contract />
              </BusinessOnlyRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractver"
          element={
            <ProtectedRoute>
              <BusinessOnlyRoute>
                <ContractVer />
              </BusinessOnlyRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/companyinfo"
          element={
            <ProtectedRoute>
              <BusinessOnlyRoute>
                <CompanyInfo />
              </BusinessOnlyRoute>
            </ProtectedRoute>
          }
        />

        {/* 관리자만 접근 가능 라우트 */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminOnlyRoute>
                <AdminPage />
              </AdminOnlyRoute>
            </ProtectedRoute>
          }
        />

        {/* 비회원만 접근 가능 라우트 */}
        <Route
          path="/signin"
          element={
            <PublicOnlyRoute>
              <Signin />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signupver"
          element={
            <PublicOnlyRoute>
              <SignupVer />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/idfind"
          element={
            <PublicOnlyRoute>
              <IdFind />
            </PublicOnlyRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
