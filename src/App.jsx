import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInfo from "./pages/UserInfo";
import Footer from "./pages/footer";
import "./App.css";
import LOGO from "./assets/LOGO.jpeg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <img src={LOGO} alt="shopsphere-logo" />
        <h2 className="shopsphere">ShopSphere</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <span>Hello, {user.username}</span>
              <Link to="/user-info" title="Profile" className="user-icon">👤</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
            </>
          )}
        </div>
      </nav>

      <ToastContainer autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/user-info" element={<UserInfo user={user} setUser={setUser} />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;