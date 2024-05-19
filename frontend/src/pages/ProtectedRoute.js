import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { Navigate } from 'react-router-dom';
import PageLoading from './PageLoading';

const ProtectedRoute = ({children}) => {
  const [user,isLoading]=useAuthState(auth);
  
  //if user is loading 
  if(isLoading){
    return <PageLoading />
  }

  //if user is not valid i.e not logged in then navigate to login page
  if(!user){
    return <Navigate to='/login'/>
  }


  //if user exists then return to children
  return children;
}

export default ProtectedRoute