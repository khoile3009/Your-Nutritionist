import React, { Component } from 'react'
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import Popup from 'reactjs-popup'

class DevPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <>
            <Player
                aspectRatio='auto'
                playsInline
                poster='https://i.ibb.co/nQmRB25/cook.jpg'
                src="https://www.youtube.com/watch?v=3fglc544SgU"
                ref={(player) => { this.player = player }}
            />
            <button onClick={()=>{this.player.muted = !this.player.muted}}>toggle mute</button>
            <button onClick={()=>{this.player.seek(60)}}>20</button>
        </>
    }
}

export default DevPage;