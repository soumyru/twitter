import React from "react";
import "./Widgets.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { TwitterTweetEmbed, TwitterTimelineEmbed } from "react-twitter-embed";

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchSharpIcon className="widgets__searchIcon" />
        <input type="text" placeholder="Search Twitter" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
      </div>
      <TwitterTweetEmbed tweetId={"1791689030641578286"} /> {/*Got the id from the below commented embed code */}
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 400 }}
      />
    </div>
  );
};

export default Widgets;

//this below is an embed code got it from X's Elon Musk's post
{/* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ice cream is an amazing invention <a href="https://t.co/l2tPcBMuy7">pic.twitter.com/l2tPcBMuy7</a></p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1791689030641578286?ref_src=twsrc%5Etfw">May 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}