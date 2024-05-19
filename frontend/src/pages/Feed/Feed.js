import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./Feed.css";
import TweetBox from "./TweetBox/TweetBox";

function Feed() {
    const [posts, setPosts] = useState([]);

    //getting the posts
    useEffect(() => {
        fetch('http://localhost:5000/post')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setPosts(data);
            })
    }, [posts]) //we have set 'posts' as dependency so that when a new post is posted then the whole page will re-render and it will be displayed in real-time

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
        </div>

    )

}

export default Feed