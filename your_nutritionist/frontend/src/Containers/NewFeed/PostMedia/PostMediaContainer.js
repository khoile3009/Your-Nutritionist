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
                <Row className='post-media-wrapper'>
                    <Col xs={1}><Button onClick={this.toLeft}>Left</Button></Col>
                    <Col xs={10}>
                        <PostMedia media={this.state.medias[this.state.topMedia]}/>
                    </Col>
                    <Col xs={1}><Button onClick={this.toRight}>Right</Button></Col>
                </Row>
                {/* <div className="newfeed-media" /> */}
            </div>
        )
    }
}

export default PostMediaContainer;