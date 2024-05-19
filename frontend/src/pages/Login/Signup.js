import React, { useState } from 'react'
import twitterImage from '../../assets/image/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useCreateUserWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";


const Signup = () => {
    const [username,setUsername]=useState('');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // const [errorMessage,setError]=useState('');
    const navigate=useNavigate();


    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    //got from react-firebase-hook-github>>useSignInWithGoogle(changed variable names from user to googleUser)
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    if(user || googleUser){
        navigate('/')//when user signed in or signed up this navigates to homepage
        console.log(user);
        console.log(googleUser);
    }

    if(error)
    console.log(error.message);

    if(loading)
    console.log('loading...');

    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(email,password);
        createUserWithEmailAndPassword(email,password);

        //we are creating a user object so that when user is signing up we will store his data in our mongodb database
        const user={
            username:username,
            name:name,
            email:email,
            //not storing users password for in case our database gets hacked then user's dat awill be exposed
        }
        //post is a data & route link is register
        axios.post(`http://localhost:5000/register`,user);

    //     fetch('http://localhost:5000/post', {//in fetch we are fetching the post route
    //       method: "POST",
    //       headers: {
    //           'content-type': 'application/json'
    //       },
    //       body: JSON.stringify(userPost),
    //   })
    //       .then(res => res.json()) // we get the response
    //       .then(data => { //get data n console log it
    //           console.log(data);

    //       })
    }

    //Google button onClick 
    const handleGoogleSignIn=()=>{
        // e.preventDefault();
        // console.log(email,password);
        // createUserWithEmailAndPassword(email,password);
        signInWithGoogle();
    }

  return (
    <div className='login-container'>
    <div className="image-container">
        <img className='image' src={twitterImage} alt="" />
    </div>
    <div className="form-container">
        <div className="form-box">
        <TwitterIcon className='Twitericon' style={{color:'skyblue'}}/>
        <h2 className='heading'>Happening now</h2>
        <h3 className='heading1'>Join twitter today</h3>
        <form onSubmit={handleSubmit}>

            <input type="text" 
            className='display-name'
            placeholder='@username'
            onChange={(e)=>{setUsername(e.target.value)}}
            />
            
            <input type="text" 
            className='display-name'
            placeholder='Enter full name'
            onChange={(e)=>{setName(e.target.value)}}
            />
            
            <input 
            type="email" 
            className='email'
            placeholder='Email address'
            onChange={(e)=>{setEmail(e.target.value)}}
            />

            <input type="password" 
            className='password'
            placeholder='Password'
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <div className='btn-login'>
                <button type='submit' className='btn'>Sign up</button>
            </div>
        </form>
        <hr />
        <div className='google-button'>
            <GoogleButton
            className='g-btn'
            type='light'
            onClick={handleGoogleSignIn}
            />
        </div>
        <div>
            Already have na account?
                <Link
                to='/login'
                style={{
                    textDecoration:'none',
                    color:'skyblue',
                    fontWeight:'600',
                    marginLeft:'5px'
                }}
                >
                Login
                </Link>
        </div>
        </div>
    </div>
</div>
  )
}

export default Signup