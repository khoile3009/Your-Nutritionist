import React, {Component} from 'react'
import './MediaCard.css'
import { Player } from 'video-react';

const ImageCard =(props)=>{
    return <div className='media-card' style={{
        zIndex: props.zIndex,  
        backgroundImage: "url('" + props.url + "')"}}>
        {/* <h1>{props.media.url}</h1> */}
    </div>

}

const VideoCard =(props)=>{
    return <div className='media-card' style={{zIndex: props.zIndex}}>
        <Player
        fluid={false}
        width='100%'
        height='100%'
        src={props.url}
        ref={(player) => { props.setPlayer(player)}}
        ></Player>
    </div>

}

export {ImageCard, VideoCard}