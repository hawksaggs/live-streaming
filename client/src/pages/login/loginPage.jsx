import { useState, useEffect } from "react";
import "./loginPage.css";
import axios from "axios";
import { setAuthToken } from "../../helpers";
import { history } from "../../helpers";

 // add dynamic class to body tag
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add('login');
    return () => {
      document.body.classList.remove('login');
    }
  }, []);

  function submitForm(e) {
    e.preventDefault();
    console.log(username, password);

    axios
      .post(
        process.env.REACT_APP_API_URL + "/v1/auth/login",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((response) => {
        console.log(JSON.stringify(response.data));
        //get token from response
        const { token, userId } = response.data.data;

        //set JWT token to local
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        history.navigate("/dashboard/home/control-room");
      })
      .catch((err) => console.log(err));
  }
  return (
      <div className="login-container">
        <form onSubmit={submitForm} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>

    // <form onSubmit={submitForm}>
    //   <label>
    //     <p>Username</p>
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </label>
    //   <label>
    //     <p>Password</p>
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </label>
    //   <div>
    //     <button type="submit">Submit</button>
    //   </div>
    // </form>
  );
};

export default LoginPage;
