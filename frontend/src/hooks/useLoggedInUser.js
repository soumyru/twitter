import { useState,useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../firebase.init';

const useLoggedInUser = () => {
    const [user]=useAuthState(auth);//getting current user from useAuthState
    const email=user?.email;
    const [loggedInUser,setLoggedInUser]=useState({});

    useEffect(()=>{
        fetch(`http://localhost:5000/loggedInUser?email=${email}`)
        .then(res=>res.json()) //getting response
        .then(data=>{ //get data
            // console.log(data)
            setLoggedInUser(data);
        })
    },[email,loggedInUser]) //email,loggedInUser as dependency

    return [loggedInUser,setLoggedInUser];
}

export default useLoggedInUser