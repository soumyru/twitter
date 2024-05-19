import React from "react";
import "./MainPage.css";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useNavigate } from "react-router-dom";
import useLoggedInUser from "../../../hooks/useLoggedInUser";
import CenterFocusWeakSharpIcon from "@mui/icons-material/CenterFocusWeakSharp";
import MyLocationSharpIcon from "@mui/icons-material/MyLocationSharp";
import AddLinkSharpIcon from "@mui/icons-material/AddLinkSharp";
import LockResetSharpIcon from '@mui/icons-material/LockResetSharp';
import { useState, useEffect } from "react";
import Post from "../../Feed/Post/Post";
import axios from "axios";
import EditProfile from "../EditProfile/EditProfile";

const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const [loggedInUser] = useLoggedInUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
//   const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/userPost?email=${user?.email}`) //using query to fetch user email
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPosts(data);
      });
  }, [posts,user?.email]); //we have set 'posts' as dependency so that when a new post is posted then the whole page will re-render and it will be displayed in real-time

  const username = user?.email?.split("@")[0];

  const handleUploadCoverImage = (e) => {
    //copy pasted from handle Tweetbox
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
        const url=res.data.data.display_url;
        const userCoverImage={
            email:user?.email,
            coverImage:url
        }
        //console.log(url); //now this will display the uploaded image url in imgbb site
        setIsLoading(false);

        //if we have url then we will go to this route and update it
        if(url){
            axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userCoverImage);
        }
    })
  };


  const handleUploadProfileImage = (e) => {
    //copy pasted from handle Tweetbox
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
        const url=res.data.data.display_url;
        const userProfileImage={
            email:user?.email,
            profileImage:url
        }
        console.log(url); //now this will display the uploaded image url in imgbb site
        setIsLoading(false);
        if(url){
            axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userProfileImage);
        }
    })
  };

  return (
    <div>
      <ArrowBackSharpIcon className="arrow-icon" onClick={() => { navigate("/") }}/>
      <h4 className="heading-4">@{username}</h4>
      <div className="mainProfile">
        <div className="profile-bio">
          {
            <div>
              <div className="coverImageContainer">
                <img
                  className="coverImage"
                  src={
                    loggedInUser[0]?.coverImage
                      ? loggedInUser[0]?.coverImage
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt=""
                />
                <div className="hoverCoverImage">
                  <label htmlFor="image" className="imageIcon">
                    {
                        isLoading? <LockResetSharpIcon className="photoIcon phototIconDisabled"/> :
                        <CenterFocusWeakSharpIcon className="photoIcon" />} 
                  </label>
                  <div className="imageIcon__tweetButton">
                    <input
                      type="file"
                      id="image"
                      className="imageInput"
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>
              <div className="avatar-img">
                <div className="avatarContainer">
                  <img
                    className="avatar"
                    src={
                      loggedInUser[0]?.profileImage
                        ? loggedInUser[0]?.profileImage
                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    }
                    alt=""
                  />
                  <div className="hoverAvatarImage">
                    <div className="imageIcon__tweetButton">
                      <label htmlFor="profileImage" className="imageIcon">
                        {
                            isLoading? <LockResetSharpIcon className="photoIcon phototIconDisabled"/> :
                            <CenterFocusWeakSharpIcon className="photoIcon" />} 
                      </label>
                      <div className="imageIcon__tweetButton">
                        <input
                          type="file"
                          id="profileImage"
                          className="imageInput"
                          onChange={handleUploadProfileImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedInUser[0]?.name
                        ? loggedInUser[0]?.name
                        : user && user?.displayName}
                    </h3>
                    <p className="usernameSection">@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser}/>
                  </div>
                  <div className="infoContainer">
                    {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
                    <div className="locationAndLink">
                      {loggedInUser[0]?.location ? (
                        <p className="subInfo">
                          <MyLocationSharpIcon />
                          {loggedInUser[0]?.location}
                        </p>
                      ) : (
                        ""
                      )}
                      {loggedInUser[0]?.website ? (
                        <p className="subInfo link">
                          <AddLinkSharpIcon />
                          {loggedInUser[0]?.website}
                        </p> ) : ( "" )
                      }
                    </div>
                  </div>
                  <h4 className="tweetsText">Tweets</h4>
                  <hr />
                </div>
                {posts.map((p) => (
                  <Post key={p._id} p={p} />
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;
