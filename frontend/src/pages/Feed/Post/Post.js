import React from 'react'
import './Post.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import RepeatSharpIcon from '@mui/icons-material/RepeatSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import PublishSharpIcon from '@mui/icons-material/PublishSharp';
import { Avatar} from "@mui/material";

const Post = ({p}) => {
    const {name, username, photo, post, profilePhoto}=p; //props

  return (
    <div className='post'>
        <div className="post__avatar">
            <Avatar src={profilePhoto}></Avatar>
        </div>
        <div className="post__body">
            <div className="post__header">
                <div className="post__headerText">
                    <h3>
                        {name}{" "}
                        <span className='post__headerSpecial'>
                            <VerifiedIcon className='post__badge'/> @{username}
                        </span>
                    </h3>
                </div>
                <div className="post__headerDescription">
                    <p>{post}</p>
                </div>
                <img src={photo} alt="" width='500'/>
                <div className="post__footer">
                    <ChatBubbleOutlineSharpIcon className='post__footer__icon' fontSize='small'/>
                    <RepeatSharpIcon className='post__footer__icon' fontSize='small'/>
                    <FavoriteBorderSharpIcon className='post__footer__icon' fontSize='small'/>
                    <PublishSharpIcon className='post__footer__icon' fontSize='small'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post