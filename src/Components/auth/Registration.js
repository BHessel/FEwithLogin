import React, { useState, useRef } from 'react';
import { API_ROOT } from '../../services/apiRoot';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Registration = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signupUser } = useAuth();
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return alert("Passwords do not match")
        }
        try {
            setError("");
            setLoading(true);
            await signupUser(
                emailRef.current.value,
                passwordRef.current.value,
                confirmPasswordRef.current.value
                )
            } catch {
                setError("Error signing up")
            }
            setLoading(false);
        }
    
    
    
    return (
        <div className='create-user'>
        {/* classNames above may need to change to make sure the form lays out properly w/ merged files */}
            <form onSubmit={handleSubmit}>
                
                <h3 className='top-label'>
                    Create an Account
                </h3>

                <div className=''>
                    <input                       
                        type="email"
                        name="email"
                        placeholder='Email'
                        ref={emailRef}
                        className='search'
                        required
                    />
                </div>

                <div>
                    <input                       
                        type="password"
                        name="password"
                        placeholder='Password'
                        ref={passwordRef}
                        className='search'
                        required
                    />
                </div>

                <div>
                    <input                       
                        type="password"
                        name="password_confirmation"
                        placeholder='Password Confirmation'
                        ref={confirmPasswordRef}
                        className="search"
                        required
                    />
                </div>

                <button type="submit" className="button-27">
                    Register
                </button>

            </form>
        </div>
    );
}

export default Registration;