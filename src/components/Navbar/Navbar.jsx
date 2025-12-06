import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo/logo.png";
import Button from "../Button/Button.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); //hamburgur..
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
    setMenuOpen(false); // close menu on logout
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="nav-container">
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={Logo} alt="logo" />
      </div>
onClick={() => navigate("/")}
      <div className={`btn-container ${menuOpen ? "open" : ""}`}>
        {currentUser ? (
          <>
            <span className="user-name">{currentUser.name} 👤</span>

            {location.pathname !== "/products" && (
              <Button text="Products" onClick={() => {navigate("/products"); setMenuOpen(false)}} />
            )}

            {location.pathname === "/products" && (
              <Button text="Home" onClick={() => {navigate("/"); setMenuOpen(false)}} />
            )}

            <Button text="Logout" onClick={logout} />
          </>
        ) : (
          <>
            <Button text="Login" onClick={() => {navigate("/login"); setMenuOpen(false)}} />
            <Button text="Signup" onClick={() => {navigate("/signup"); setMenuOpen(false)}} />
          </>
        )}
      </div>

   
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
}

export default Navbar;
