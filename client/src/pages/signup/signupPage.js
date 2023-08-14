import { useState } from "react";
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

  return (
    <form onSubmit={submitForm}>
      <label>
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SignUpPage;
