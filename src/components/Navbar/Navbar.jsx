import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo/logo.png"
import Button from "../Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  }
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <img src={Logo} alt="logo" />
      </div>
      <div className="btn-container">
        {currentUser ? (
          <div>
            <span style={{ marginRight: "10px",fontSize:"20px",fontWeight:"bolder", color:"red" }}>{currentUser.name}👤</span>
            <Button text="Create Product" onClick={() => navigate("/products")} />
            <Button text="Logout" onClick={logout} />
          </div>
        ) : (
          <div>
            <Button text="Login" onClick={() => navigate("/login")} />
            <Button text="Signup" onClick={() => navigate("/signup")} />
          </div>
        )}
      </div>

    </div>
  )
}

export default Navbar