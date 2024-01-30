import './App.css';
import Homepage from './Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

axios.defaults.baseURL = "http://devfeat.com"

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>

      </BrowserRouter>



    </>
  );
}

export default App;
