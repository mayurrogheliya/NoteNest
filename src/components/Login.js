import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credential, setCredential] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetch(`http://localhost:4000/api/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ email: credential.email, password: credential.password })
            })
            const json = await data.json();
            console.log(json);
            if (json.success) {
                // Save the authtoken and redirect
                localStorage.setItem("token", json.authToken);
                props.showAlert("Loggedin successfully", "success");
                navigate("/");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })  // spread operation
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign in to access your notes on NoteNest</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} id="email" name="email" aria-describedby="email" onChange={onChange} />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
