import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigation = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      console.log("Login Successful:", response.data);
      Navigation("/Home");
      setError("");
    } catch (err) {
      console.error("Login Failed:", err.response.data.error);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h1>Login Page</h1>

      <div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
