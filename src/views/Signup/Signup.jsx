import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button.jsx";
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [sellerExists, setSellerExists] = useState(false);
  const navigate = useNavigate();

  // Check if seller already exists
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.role === "seller")) setSellerExists(true);
  }, []);

  const signupUser = (e, role = "user") => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      setError("Invalid email address");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check for duplicate username
    if (users.some(u => u.name === user.name)) {
      setError("Username already exists! Choose another.");
      return;
    }

    // ✅ Check for duplicate email
    if (users.some(u => u.email === user.email)) {
      setError("Email already registered! Please login.");
      return;
    }

    // Add new user
    const newUser = { ...user, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    if (role === "seller") setSellerExists(true);

    setError("");
    alert(`Signup successful as ${role}!`);
    navigate("/login");
  };

  return (
    <div className='signup-bg'>
      <form className='signup-form'>
        <h2>Create Your Account</h2>

        <input
          type="text"
          placeholder='Username'
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder='Email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder='Password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          type="password"
          placeholder='Confirm Password'
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Button type="button" text="Signup as User" onClick={(e) => signupUser(e, "user")} />
          <Button type="button" text="Signup as Seller" onClick={(e) => signupUser(e, "seller")} disabled={sellerExists} />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
