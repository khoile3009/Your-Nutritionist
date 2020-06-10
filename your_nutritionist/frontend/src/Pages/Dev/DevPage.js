import React, { Component } from 'react'
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
class DevPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <>
            <ReactPlayer 
            url='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
            ref={(player) => { this.player = player }}
            volume='0.5'
            controls='true'
            light
            />
            <button onClick={()=>{this.player.muted = !this.player.muted}}>toggle mute</button>
            <button onClick={()=>{this.player.seekTo(60)}}>60</button> 
            {/* <Player
                aspectRatio='auto'
                playsInline
                poster='https://i.ibb.co/nQmRB25/cook.jpg'
                src="https://www.youtube.com/watch?v=3fglc544SgU"
                ref={(player) => { this.player = player }}
            />
            <button onClick={()=>{this.player.muted = !this.player.muted}}>toggle mute</button>
            <button onClick={()=>{this.player.seek(60)}}>20</button> */}
            
        </>
    }
}

export default DevPage;