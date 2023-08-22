import logo from './logo.svg';
import './App.css';
import Navbar from './components/common/Navbar';
import Signup from './components/core/Auth/Signup';
import Login from './components/core/Auth/Login';
import {Route, Routes } from "react-router-dom";
import Home from './components/core/Home';
import Cart from './components/common/Cart';
import OpenRoute from './components/common/OpenRoute';

function App() {
  return (
    <div >
      <Navbar />
      <Routes>

        <Route
          path="signup"
          element={
            <OpenRoute>
            <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
            <Login />
            </OpenRoute>
          }
        />

        <Route
        path='/'
        element={
          <Home />
        } 
        />

        <Route
        path='cart'
        element={
          <Cart />
        }
        />

        

      </Routes>
    </div>
  );
}

export default App;
