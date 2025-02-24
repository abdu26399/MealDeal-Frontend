import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import FormInput from "../common/formInput";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const validateEmail = (email) => {
      // Regex to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const formData = { email, password };

    try {
      await fetch("http://mealdeal.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setErrorMessage("Wrong with response!");
          }
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("userId", res);
          localStorage.setItem("isCustomer", false);
          window.location.href = "/vendorHome";
        });
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="bgImage">
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-lg-9 col-sm-9">
            <p>Hello there</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 card p-4">
            <form onSubmit={handleLogin}>
              <h5 className="card-title mb-4 text-center">Vendor Login</h5>
              <FormInput
                value={email}
                type="text"
                name="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormInput
                value={password}
                type="password"
                name="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="btn btn-primary mt-3" type="submit">
                Login
              </button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </form>
            <p className="mt-3">
              <center>Don't have an account?</center>
            </p>
            <h6 className="message mt-3">
              <center>
                Not a Tiffin Vendor?{" "}
                <Link className="pointer" to="/customer/login">
                  Customer
                </Link>
              </center>
            </h6>
            <h6 className="message mt-1">
              <center>
                Not Registered?{" "}
                <Link className="pointer" to="/tiffin-vendor/register">
                  Register
                </Link>
              </center>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;