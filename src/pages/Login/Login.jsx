import React from "react";
import { useRef } from "react";
import verifyUser from "../../../data/user";

import Form from "react-bootstrap/Form";
const Login = ({ setToken, setRole }) => {
  const userRef = useRef();
  const passRef = useRef();
  return (
    <div className="container-xxl">
      <div className="border p-3">
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control type="text" id="username" placeholder="username" ref={userRef}/>
        <Form.Label htmlFor="username">Password</Form.Label>
        <Form.Control type="password" id="password" placeholder="password" ref={passRef}/>
        <div
          className="btn btn-success mt-3"
          onClick={() => {
            const user = userRef.current.value.trim();
            const pass = passRef.current.value.trim();
            const userInfo = verifyUser(user, pass);
            if (userInfo == null) {
                alert("Invalid username or password");
                userRef.current.value = "";
                passRef.current.value = "";
                userRef.current.focus();
            }else{
                setToken(userInfo.Token);
                setRole(userInfo.Role);
            }
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
