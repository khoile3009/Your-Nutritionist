import React, { Component } from 'react'
import './MediaCard.css'
import { Player } from 'video-react';
import ReactPlayer from 'react-player';
import { Container } from 'react-bootstrap'
const ImageCard = (props) => {
    return <div className={props.classes} style={{
        zIndex: props.zIndex,
        backgroundImage: "url('" + props.url + "')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
    }}>
        {/* <h1>{props.media.url}</h1> */}
    </div>

}

const VideoCard = (props) => {
    return <div className={props.classes} style={{ zIndex: props.zIndex }}>
        <ReactPlayer
            playing={props.playing}
            url={props.url}
            height='100%'
            width='100%'
            ref={(player) => { props.setPlayer(player)}}
            controls={true}
        />
        {/* <Player
        fluid={false}
        width='100%'
        height='100%'
        src={props.url}
        ref={(player) => { props.setPlayer(player)}}
        ></Player> */}
    </div>

}

export { ImageCard, VideoCard }