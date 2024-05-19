import React from 'react'
import '../Page.css'
import MainPage from './MainPage/MainPage'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'


const Profile = () => {
  const [user]=useAuthState(auth);

  return (
    <div className='profilePage'>
      <MainPage user={user}/> {/*passing user as prop so that we dont have to get it separately in main and edit page */}
    </div>
  )
}

export default Profile