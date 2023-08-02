import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const LoginFormPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post(
      //   "http://localhost:4000/login",
      //   {
      //     ...inputValue,
      //   },
      //   { withCredentials: true }
      // );
      const { email, password } = inputValue;
      const data = await dispatch(login(email, password))

      console.log(data);
      const { success, message } = data;
      console.log(success);
      if (success) {
        console.log('we have success====> ', success);
        handleSuccess(message);
        history.push('/')
      } else {
        handleError(message);
        return 
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginFormPage;
