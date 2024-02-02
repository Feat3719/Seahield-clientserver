import './App.css';
import Homepage from './home/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupVer from './signupVer/SignupVer';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import axios from 'axios';
import IdFind from './find/IdFind';
// import Sidenav from './sidenav/Sidenav';


axios.defaults.baseURL = "http://devfeat.com"

function App() {

  // const main = <Sidenav/>;
  return (
    <>
      {/* <Sidenav/> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signupver' element={<SignupVer />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/idfind' element={<IdFind />} />
        </Routes>

      </BrowserRouter>



    </>
  );
}

export default App;
