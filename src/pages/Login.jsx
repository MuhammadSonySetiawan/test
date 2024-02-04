import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch } from "react-redux";
import { addAuth } from "../features/counter/counterAuth"
import { user } from "../features/counter/counterName";
// import { Link } from "react-router-dom/dist";

function Login() {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigation = useNavigate();
  const dispatch = useDispatch();
  

  const handleLogin = async () => {
    try {
      dispatch(user(name));
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      const result = response.data;
      dispatch(addAuth(result.token));
      Navigation("/Home");
      setError("");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1>Login</h1>

        <div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Submit
          </button>

          {/* <p className="mt-4">
            Don't have an account? go to <Link to="/register">register</Link>
          </p> */}
          {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
