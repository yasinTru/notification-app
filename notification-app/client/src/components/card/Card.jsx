import React, { useState } from 'react'
import "./card.css"
import Heart from "./../../img/heart.svg"
import Comment from "./../../img/comment.svg"
import Info from "./../../img/info.svg"
import Share from "./../../img/share.svg"
import filledHeart from "./../../img/filledHeart.svg"

const Card=({post, socket, user})=> {

    const [liked, setLiked]= useState(false);
    
    const handleNotification= (type)=>
    {
        setLiked(true);
        socket.emit("sendNotification",
        {
            senderName:user,
            receiverName: post.username,
            type,
        })
    }

    const handleMessage= (type)=>
    {
        setLiked(true);
        socket.emit("sendText",
        {
            senderName:user,
            receiverName: post.username,
            type,
        })
    }

    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="" className="userImg"></img>
            <span>{post.fullname}</span>
            </div>

            <img src={post.postImg} alt="" className="postImg"></img>
            
            <div className="interaction">
                {liked ? (<img src= {filledHeart} alt="" className="cardIcon"></img>): (
                <img src= {Heart} alt="" className="cardIcon" onClick={()=> handleNotification(1)}></img>
                )}
                <img src= {Comment} alt="" className="cardIcon"  onClick={()=> handleNotification(2)}></img>
                <img src= {Info} alt="" className="cardIcon infoIcon"></img>
                <img src= {Share} alt="" className="cardIcon"  onClick={()=> handleNotification(3)}></img>
            </div>
        </div>
    )
}

export default Card
