import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credential;
        const data = await fetch(`http://localhost:4000/api/auth/createUser`, {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await data.json();
        console.log(json);
        if (json.success) {
            // Save the authtoken and redirect
            localStorage.setItem("token", json.authToken);
            navigate("/");
            props.showAlert("Account created successfully", "success");
        } else {
            props.showAlert("Invalid Detials", "danger");
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })  // spread operation
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default Signup
