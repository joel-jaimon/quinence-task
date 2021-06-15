import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListUsers from "./ListUsers";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { getPoolConfig } from "../Config/UserPool";
import "./signup.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [modal, showModal] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const poolConfig = await getPoolConfig();
    const UserPool = new CognitoUserPool(poolConfig);
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
        if (data) {
          setErr("Registered Successfully.");
        }
        setLoading(false);
      }
    );
  };

  return (
    <div className="signup-container">
      {modal ? <ListUsers setModal={showModal} /> : null}
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
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
          <button type="submit">Sign In</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              showModal(true);
            }}
            type="button"
          >
            View Users
          </button>
        </form>
      )}
      <div className="err-msg">{err}</div>
    </div>
  );
};

export default Signup;
