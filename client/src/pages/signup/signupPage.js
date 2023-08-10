import { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submitForm(e) {
        e.preventDefault();
        console.log(name, email, password);
        let data = JSON.stringify({
            "name":name,
            "username": email,
            "password": password
        });

        let config = {
            method: 'POST',
            url: process.env.REACT_APP_API_URL + '/v1/auth/register',
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
                <p>Name</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label>
                <p>Email</p>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
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

export default SignUpPage;
