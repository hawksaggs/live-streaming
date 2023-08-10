import { useState } from "react";
import axios from "axios";
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitForm(e) {
        e.preventDefault();
        console.log(username, password);
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'POST',
            url: process.env.REACT_APP_API_URL + '/v1/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return(
        <form onSubmit={submitForm}>
            <label>
                <p>Username</p>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default LoginPage;
