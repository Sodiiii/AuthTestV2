import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

import "./login.css";

const Login: FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name && password) {
    dispatch(
      login({
        name: name,
        password: password,
        loggedIn: true,
      })
    );
  } else alert('Пожалуйста, заполните поля регистрации')
  };
  return (
    <div className="login-box">
      <h2>Зарегистрироваться</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <a href="/home" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Логин
        </a>
      </form>
    </div>
  );
};

export default Login;
