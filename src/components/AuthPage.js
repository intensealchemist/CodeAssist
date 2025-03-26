import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
  return (
    <Router>
      <div className="w-full max-w-md mx-auto p-4">
        <nav className="mb-4 flex justify-center space-x-4">
          <Link to="/login" className="text-white px-4">Login</Link>
          <Link to="/register" className="text-white px-4">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <h1 className="text-white text-center">
                Welcome, please login or register.
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AuthPage;
