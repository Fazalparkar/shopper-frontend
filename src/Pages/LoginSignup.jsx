import React, { useState } from 'react';
import  './CSS/LoginSignup.css'

const LoginSignup = () => {

    const [state,setState] = useState("Login");
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:""

    })

    const changeHandler = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }

    const login = async ()=>{
        console.log("Login Function Executed",formData)
        let responseData;
        await fetch('https://shopper-backend-ua0i.onrender.com/login',{
            method:'POST',
            headers:{
                Accept: 'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }

    }

    const signup = async ()=>{
        console.log("Signup Function Executed",formData)
        let responseData;
        await fetch('https://shopper-backend-ua0i.onrender.com/signup',{
            method:'POST',
            headers:{
                Accept: 'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }


    }
    return(
        <div className='loginsignup'>
        <div className='loginsignup-container'>
            <h1>{state}</h1>
            <div className='loginsignup-fields'>
            {state=== "Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name'></input>:<></>}
            <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address'></input>
            <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password'></input>

            </div>
            <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
            {state === "Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>login here</span></p>
            :<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
            
            
            <div className='loginsignup-agree'>
                <input type='checkbox' name='' id=''></input>
                <p>By continuing, U agree to use the terms of use & privacy policy</p>
            </div>
        </div>

        </div>
    )
}

export default LoginSignup