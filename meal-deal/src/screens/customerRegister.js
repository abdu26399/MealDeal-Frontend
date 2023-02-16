import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/signup.css'
import FormInput from "../common/formInput";


function SignupForm() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accountType, setAccountType] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const validateEmail = (email) => {
      // Regex to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePhone = (phno) => {
      // Regex to validate phone number format
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    };
  
      // Validate first name
      if (!fname) {
        setErrorMessage('Please enter your first name.');
        return;
      }
  
      // Validate last name
      if (!lname) {
        setErrorMessage('Please enter your last name.');
        return;
      }

      // Validate phone number
    if (!validatePhone(phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // if (!address(address)) {
    //   setErrorMessage('Please enter your Address.');
    //   return;
    // }

    if (!accountType) {
      setErrorMessage('Account type is required');
      return;
    }

    // Validate password
    if (password.length > 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const formData = {
      fname,
      lname,
      phone,
      email,
     // address,
      accountType,
      password,
      confirmPassword
    };

     try {
       const response = await fetch('http://localhost:8080/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
       });

       if (response.ok) {
         // Sign up successful, redirect to home page
         window.location.href = '/';
       } else {
         setErrorMessage('Something went wrong, please try again later.');
       }
     } catch (error) {
       setErrorMessage('Something went wrong, please try again later.');
     }
  };

  return (
    <div className='class form-card shadow-lg'>
    <h5 className="card-title mb-5"><center>Customer Register</center></h5>
    <form onSubmit={handleSubmit}>
    <FormInput
            value={fname}
            type="text"
            id="fname"
            name="First name"
            onChange={(event) => setFName(event.target.value)} required
          />
          <FormInput
            value={lname}
            type="text"
            id="lname"
            name="Last name"
            onChange={(event) => setLName(event.target.value)} required 
            />
          <FormInput
            value={phone}
            type="phone"
            id="phone"
            name="Phone no."
            onChange={(event) => setPhone(event.target.value)} required 
            />
          <FormInput
            value={email}
            type="email"
            id="email"
            name="Email id."
            onChange={(event) => setEmail(event.target.value)} required 
            />
            {/* <FormInput
            value={address}
            type="text"
            id="address"
            name="Address"
            onChange={(event) => setAddress(event.target.value)} required 
            /> */}
      <div>
          <label><center>Role:</center></label>
          <div className='side-by-side'>
          <label htmlFor="vendor">Vendor</label>
            <input type="radio" name="role" value="customer" checked={accountType === 'customer'} onChange={(event) => setAccountType(event.target.value)} required />
            <label htmlFor="customer">Customer</label>
            <input type="radio" name="role" value="vendor" checked={accountType === 'vendor'} onChange={(event) => setAccountType(event.target.value)} required />
          </div>
      </div>
      <FormInput
            value={password}
            type="password"
            id="password"
            name="Password"
            onChange={(event) => setPassword(event.target.value)} required 
            />
      <FormInput
            value={confirmPassword}
            type="password"
            id="confirmPassword"
            name="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)} required 
            />
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Sign Up</button>
          <h6 className="card-title mt-2">
            <center>
            Already Registered?{" "}
            <Link className="pointer" to="/customer/login">
              Login
            </Link>
            </center>
          </h6>
    </form>
    </div>
  );
}
export default SignupForm;
