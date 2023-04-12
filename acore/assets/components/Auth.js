import { useState } from "react";
import React from "react";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(nul)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogin && password !== confirmPassword){
            setError('Make sure passwordds match')
            return
        }
        await fetch(`${URLS.account}/${endpoint}`), {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({user, password})
        }
    }
    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLogin ? 'Please Log in' : "Please Sign Up!" }</h2>
                    <input type="text" placeholder="username" 
                    onChange={(e) => setUser(e.target.value)}/>
                    <input type="password" placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
                    {!isLogin && <input 
                    type="password" placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)} />}
                    <input type="submit" className="create" />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button onClick={() => viewLogin(false)}
                    style= {{backgroundColor: !isLogin ? 'white' : 'gray'}}
                    >Sign Up</button>
                    <button onClick={() => viewLogin(true)}
                    style= {{backgroundColor: !isLogin ? 'white' : 'gray'}}
                    >Login</button>
                </div>
            </div>
        </div>
    )
}
export default Auth