import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
    return (
      <div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <Router>
                  <Routes>
                      <Route path="/" element={<ForgetPassword />} />
                      <Route path="/reset_password/:token" element={<ResetPassword />} />
                  </Routes>
              </Router>
        </div>
    );
};

export default App;
