import React,{ useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css"
import logo from "./assets/Add a heading.zip - 1.PNG"


function App() {
  const [user,setUser] = useState(null);

  function handleLogout(){
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="shopsphere-logo" />
        <h2 className="shopsphere">ShopSphere</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <span>Hello, {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;