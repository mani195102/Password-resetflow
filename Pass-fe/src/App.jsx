import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    return (
        <div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset_password/:token" element={<ResetPassword />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
