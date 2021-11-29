import React from "react";
import axios from "axios";
import FirstNameHooks from "../hooks/FirstNameHooks";
import LastNameHooks from "../hooks/LastnameHooks";
import UsernameHooks from "../hooks/UsernameHooks";
import EmailHooks from "../hooks/EmailHooks";
import PasswordHooks from "../hooks/PasswordHooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [
    firstName,
    handleFirstNameChange,
    firstNameError,
    setOnFocusFirstName,
    setOnBlurFirstName,
  ] = FirstNameHooks();

  const [lastName, handleLastNameChange, lastNameError, setOnFocus, setOnBlur] =
    LastNameHooks();

  const [
    username,
    handleUsernameChange,
    usernameError,
    setUsernameOnFocus,
    setUsernameOnBlur,
  ] = UsernameHooks();

  const [email, handleEmailChange, emailError, setEmailOnBlur] = EmailHooks();

  const [
    password,
    handlePasswordChange,
    passwordError,
    setPasswordOnFocus,
    setPasswordOnBlur,
  ] = PasswordHooks();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(46);
      let payload = await axios.post(
        "http://localhost:3001/api/user/create-user",
        {
          firstName,
          lastName,
          username,
          email,
          password,
        }
      );
      console.log(66);
      console.log(payload);
      //   toast.success("Account Created. Please Sign in.", {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });

      e.target.reset();
      navigate("/sign-in");
    } catch (e) {
      console.log(71);
      //   console.log(e.response.data);
      //   toast.error(e.response.data, {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
    }
  }

  return (
    <>
      <div className="center-div">
        <div className="login-wrapper">
          <h1 className="Signin__title__text">SIGN-UP</h1>
          <hr />
          <form autoComplete="off" onSubmit={handleSubmit}>
            {/* first name last email etc input boxes */}

            <input
              name="firstName"
              placeholder="First Name"
              autoComplete="off"
              onChange={handleFirstNameChange}
              onFocus={() => setOnFocusFirstName(true)}
              onBlur={() => setOnBlurFirstName(true)}
            />
            <div>{firstNameError && firstNameError}</div>

            <input
              name="lastName"
              placeholder="Last Name"
              autoComplete="new-password"
              onChange={handleLastNameChange}
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnBlur(true)}
            />
            <div>{lastNameError && lastNameError}</div>

            <input
              name="username"
              placeholder="Username"
              autoComplete="new-password"
              onChange={handleUsernameChange}
              onFocus={() => setUsernameOnFocus(true)}
              onBlur={() => setUsernameOnBlur(true)}
            />
            <div>{usernameError && usernameError}</div>

            <input
              name="email"
              placeholder="E-mail Address"
              autoComplete="new-password"
              onChange={handleEmailChange}
              onBlur={() => setEmailOnBlur(true)}
            />
            <div>{emailError && emailError}</div>

            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={handlePasswordChange}
              onFocus={() => setPasswordOnFocus(true)}
              onBlur={() => setPasswordOnBlur(true)}
            />
            <div>{passwordError && passwordError}</div>

            <button type="submit" id="sign__button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
