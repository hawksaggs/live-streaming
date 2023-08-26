import { useEffect, useState } from "react";
import "./signUpPage.css";
import axios from "axios";
import { history } from "../../helpers";
const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitForm(e) {
    e.preventDefault();
    console.log(name, email, password);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/v1/auth/register",
        {
          name: name,
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        console.log(JSON.stringify(response.data));
        //redirect user to login page
        history.navigate("/login");
      })
      .catch((err) => console.log(err));
  }

 // add dynamic class to body tag
  useEffect(() => {
    document.body.classList.add('signup');
    return () => {
      document.body.classList.remove('signup');
    }
  }, []);
  
  return (
    <div className="signup-container">
    <form onSubmit={submitForm} className="signup-form">
      <h2>Create an Account</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  </div>



    // <form onSubmit={submitForm}>
    //   <label>
    //     <p>Name</p>
    //     <input
    //       type="text"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //   </label>
    //   <label>
    //     <p>Email</p>
    //     <input
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
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

export default SignUpPage;
