import './App.css';
import Homepage from './Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupVer from './signupVer/SignupVer';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import axios from 'axios';

axios.defaults.baseURL = "http://devfeat.com"

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signupver' element={<SignupVer />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>

      </BrowserRouter>



    </>
  );
}

export default App;
