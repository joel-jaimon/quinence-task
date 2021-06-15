import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import UserPool from "../Config/UserPool";
import "./signup.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const onSubmit = async (event: any) => {
    event.preventDefault();

    await UserPool.signUp(
      username,
      password,
      [
        new CognitoUserAttribute({
          Name: "email",
          Value: email,
        }),
      ],
      [],
      (err, data) => {
        if (err) {
          setErr(err?.message);
        }
        console.log(data);
      }
    );
  };

  return (
    <div className="signup-container">
      <form onSubmit={onSubmit}>
        <label htmlFor="text">Username</label>
        <input
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button type="submit">SIGN IN</button>
      </form>
      <div className="err-msg">{err}</div>
    </div>
  );
};

export default Signup;
