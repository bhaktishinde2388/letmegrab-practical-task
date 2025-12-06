import React ,{useState} from 'react'
import Button from "../../components/Button/Button.jsx"
import { Link } from 'react-router-dom'
import './Signup.css'


function Signup() {

  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",           
  });

  const signupUser = (e) => {
     e.preventDefault(); 

    //vaidations
    //al field validationsss
     if (!user.name || !user.password || !user.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    //regex vaidation
   const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernameRegex.test(user.name)) {
      setError("Username should be 3-16 characters, letters/numbers only.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(user.password)) {
      setError("Password must include uppercase, lowercase, number & special symbol.");
      return;
    }

     if (user.password !== user.confirmPassword) {
      setError("Passwords is not match.");
      return;
    }

    //this is for adding multip signups in the localstorage
   let existingUsers = JSON.parse(localStorage.getItem("signupUsers")) || [];
   existingUsers.push(user);
   localStorage.setItem("signupUsers", JSON.stringify(existingUsers));


    console.log("User data stored in localStorage:", user);
  };

  return (
    <div className='signup-bg'>
      <form className='forms-container'>
        <input className='usename-input input-box' type="text" placeholder='Enter UserName'
          value={user.email}
          onChange={(e) => setUser({ ...user, name: e.target.value })} />

        <input className='password-input input-box' type="text" placeholder='Enter Password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })} />

        <input className='confirm-pasword-input input-box' type="text" placeholder='Confirm Password'
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}

        />
        <Button type="submit" text='signup' onClick={signupUser}/>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup