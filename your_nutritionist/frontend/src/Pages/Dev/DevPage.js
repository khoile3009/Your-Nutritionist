import React, { Component } from 'react'
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import './DevPage.css'


class DevPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            class: ['pos1', 'red-box']
        }
        this.changeClass1=this.changeClass1.bind(this)
        this.changeClass2=this.changeClass2.bind(this)
    }
    
    changeClass1 = () => {
        this.setState({class: ['pos2', 'red-box']})
    }

    changeClass2 = () => {
        this.setState({class: ['pos1', 'red-box']})
    }

    render() {
        return <>
            <div className={this.state.class.join(' ')}></div>
            <button onClick={this.changeClass1} >left</button>
            <button onClick={this.changeClass2}>right</button>
            {/* <ReactPlayer 
            url='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
            ref={(player) => { this.player = player }}
            volume='0.5'
            controls='true'
            light
            />
            <button onClick={()=>{this.player.muted = !this.player.muted}}>toggle mute</button>
            <button onClick={()=>{this.player.seekTo(60)}}>60</button>  */}
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