import React, { useState } from 'react';
import axios from 'axios';

const Registration = ({ handleSuccessfulAuth }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_Confirmation] = useState('')

    const handleSubmit = (e) => {
        // console.log('form submitted')
        axios.post("http://localhost:3000/registrations", {
            user: {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }},
            { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created') {
                handleSuccessfulAuth(response.data)
            }
        })
        .catch(error => {console.log("registration error", error)}) 
        e.preventDefault()
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirmation = (e) => {
        setPassword_Confirmation(e.target.value)
    }
    
    
    return (
        <div className='create-user left-side'>
        {/* classNames above may need to change to make sure the form lays out properly w/ merged files */}
            <form onSubmit={handleSubmit}>
                
                <h3>Create an Account</h3>

                <div className='form-group'>
                    <input                       
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmail}
                        className='form-control'
                        required
                    />
                </div>
            {/* do I need classNames in the inputs? */}
                <div className='form-group'>
                    <input                       
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={handlePassword}
                        className='form-control'
                        required
                    />
                </div>

                <div className='form-group'>
                    <input                       
                        type="password"
                        name="password_confirmation"
                        placeholder='Password Confirmation'
                        value={password_confirmation}
                        onChange={handlePasswordConfirmation}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">
                    Register
                </button>

            </form>
        </div>
    );
}

export default Registration;