import './App.css';
import Homepage from './home/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupVer from './signupVer/SignupVer';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import axios from 'axios';
import IdFind from './find/IdFind';
// import Sidenav from './sidenav/Sidenav';
import BoardList from "./board/BoardList";
import BoardDetail from "./board/BoardDetail";
import BoardUpdate from "./board/BoardUpdate";
import BoardWrite from "./board/BoardWrite";
import Intro from './intro/Intro';

axios.defaults.baseURL = "http://devfeat.com"

function App() {

  return (
    <>
      {/* <Sidenav/> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/map' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signupver' element={<SignupVer />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/idfind' element={<IdFind />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/boarddetail" element={<BoardDetail />} />
          <Route path="/boardupdate" element={<BoardUpdate />} />
          <Route path="/boardwrite" element={<BoardWrite />} />
        </Routes>

      </BrowserRouter>



    </>

  );
}

export default App;
