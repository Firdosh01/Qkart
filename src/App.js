import logo from './logo.svg';
import './App.css';
import Navbar from './components/common/Navbar';
import Signup from './components/core/Auth/Signup';
import Login from './components/core/Auth/Login';
import {Route, Routes } from "react-router-dom";
import Home from './components/core/Home';
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

      </Routes>
    </div>
  );
}

export default App;
