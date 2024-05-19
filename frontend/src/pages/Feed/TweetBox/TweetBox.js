import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
// import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedInUser from "../../../hooks/useLoggedInUser";

import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init';

function TweetBox() {
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser] = useLoggedInUser();
  const [name, setName] = useState('');
  const [username, setUsername] = useState(' ');
  const [user]=useAuthState(auth);
//   const { user } = useUserAuth();//current user
  const email = user?.email;

  //if profile picture is there, that will be displayed otherwise the avatar will be 
  const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

  /* this is the console structure when user signs up using email/password unlike google sign in
  providerData is user data and inside it is provider id which has value 'password' 
  And in case of google log in, the providerId is 'google.com' */
  // console.log(user?.providerData[0]?.providerId);

//   console.log(loggedInUser);
  const handleUploadImage = (e) => {
    setIsLoading(true); //when we upload our imae it should be loading
    const image = e.target.files[0]; //getting the image
    console.log(image);
    const formData = new FormData();
    formData.set("image", image);

    //using axios method to implement fetch method easily as fetch will complex it
    axios.post("https://api.imgbb.com/1/upload?key=023ae543332e64852a79bb86e7615247",formData) //this api key is from imgbb.com where we will host our images for free
    .then((res) => {//getting response
        // setImageURL(res);
        //console.log(res); //in console->object->data->data->display_url->contains the pictur ethat we uploaded so we will nw setImageUrl equal to that path
        setImageURL(res.data.data.display_url);
        console.log(res.data.data.display_url); //now this will display the uploaded image url in imgbb site
        setIsLoading(false);
    })
    .catch((error) => {
        console.log(error);
        setIsLoading(false);
     });
  };

  const handleTweet = (e) => {
    e.preventDefault();
    console.log(user);

    /* if user has loggedIn using google account login then in that case we don not have user info
    so we are checking if user logged in using email/password then we set name and username according to user data structure as shown in console */
    if (user?.providerData[0]?.providerId === 'password') {
        fetch(`http://localhost:5000/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setName(data[0]?.name)
                setUsername(data[0]?.username)
            })
    }
    else {
        setName(user?.displayName)
        setUsername(email?.split('@')[0])
    }

    if (name) {
      const userPost = {
        profilePhoto: userProfilePic,
        post: post,
        photo: imageURL,
        username: username,
        name: name,
        email: email,
      };
      // console.log(userPost);
      setPost("");//resetting the post field & image back i.e., after posting something the input will get empty again
      setImageURL("");
      fetch(`http://localhost:5000/post`, {//in fetch we are fetching the post route
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(userPost)
      })
        .then(res => res.json()) // we get the response
        .then(data => { //get data n console log it
            console.log(data);
        })

    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post} //the post
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          {/* <label htmlFor="image" className="imageIcon">
            <AddPhotoAlternateOutlinedIcon />
          </label> */}

          {/*if image is loading  then this will show Uploading image and if its not loading then either image is uploaded or not, if not then we display th AddPhtotIcon*/}
          <label htmlFor='image' className="imageIcon">
            {
                isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
            }
          </label>

          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}
export default TweetBox;
