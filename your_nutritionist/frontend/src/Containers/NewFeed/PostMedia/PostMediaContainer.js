import React, {Component} from 'react';
import './PostMedia.scss'
import {Row, Col, Button} from 'react-bootstrap';
import PostMedia from '../../../Components/NewFeed/PostCard/PostMedia'
class PostMediaContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            topMedia: 0,
            medias: this.props.medias
        }
    }

    toLeft = () => {
        if (this.state.topMedia != 0) {
			this.setState({topMedia:this.state.topMedia - 1});
		} else {
			this.setState({topMedia:this.state.medias.length - 1});
		}
    } 

    toRight = () => {
        if (this.state.topMedia != this.state.medias.length - 1) {
			this.setState({topMedia:this.state.topMedia + 1});
		} else {
			this.setState({topMedia:0});
		}
    }

    render(){
        return (
            <div className="newfeed-media-wrapper">
                <div className='post-media-left post-media-nav'><Button onClick={this.toLeft}><span className="material-icons">navigate_before</span></Button></div>
                <div className='post-media-wrapper'>
                    <PostMedia media={this.state.medias[this.state.topMedia]}/>
                </div>
                <div className='post-media-right post-media-nav'><Button onClick={this.toRight}><span className="material-icons">navigate_next</span></Button></div>
                {/* <div className="newfeed-media" /> */}
            </div>
        )
    }
}

export default PostMediaContainer;