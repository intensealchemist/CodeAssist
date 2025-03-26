import React from "react";
import { Routes, Route } from "react-router-dom";
import CodeAssist from "./components/CodeAssist";
import Login from "./components/Login";
import Register from "./components/Register"
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CodeAssist />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
