import React, { Component } from 'react'
import { VideoCard, ImageCard } from '../../Components/MediaCard/MediaCard'
import { Container } from 'react-bootstrap'
import './MediaShowContainer.css'
class MediaShowContainer extends Component {

    constructor(props) {
        super(props)

        // this.players 
        
    }

    componentDidMount() {
        console.log(this.state)
    }



    render() {
        console.log(this.props)
        return <div>
            <div className='left-field' >
                <div className='trigger-field' onClick={this.props.rotateMediaLeft}>
                </div>
            </div>
            <div className='right-field'>
                <div className='trigger-field' onClick={this.props.rotateMediaRight}>
                </div>
            </div>
            <Container style={{ height: '40vh', padding: '0 0' }} className='shadow media-container'>
                {this.props.medias
                    ? this.props.medias.map(
                        (media, index) => {
                            switch (media.type) {
                                case 0:
                                    return <ImageCard
                                        url={media.url}
                                        zIndex={
                                            this.props.topMedia === index
                                            ? 1
                                            : 0
                                        }
                                    ></ImageCard>;
                                case 1:
                                    return <ImageCard
                                        url={media.url}
                                        zIndex={
                                            this.props.topMedia === index
                                            ? 1
                                            : 0
                                        }
                                    ></ImageCard>;
                                case 2:
                                    return <VideoCard
                                        url={media.url}
                                        zIndex={
                                            this.props.topMedia === index
                                            ? 1
                                            : 0
                                        }
                                        setPlayer={(player)=>{this.props.setPlayer(index, player)}}
                                    ></VideoCard>
                                case 3:
                                    return <VideoCard
                                        url={media.url}
                                        zIndex={
                                            this.props.topMedia === index
                                            ? 1
                                            : 0
                                        }
                                        setPlayer={(player)=>{this.props.setPlayer(index, player)}}
                                    ></VideoCard>
                            }



                            // else return null;
                        }
                    )
                    : null}
            </Container>
        </div>
    }
}

export default MediaShowContainer