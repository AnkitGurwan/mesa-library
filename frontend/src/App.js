import React from "react";
import { Route , Routes , BrowserRouter } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import AuthState from './context/auth/AuthState';
import Home from "./components/home";

function App() {
  return (
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/:name' element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </AuthState>
    
  );
}

export default App;
