import React, { Component } from 'react'
import { VideoCard, ImageCard } from '../../Components/MediaCard/MediaCard'
import { Container } from 'react-bootstrap'
import './MediaShowContainer.css'
class MediaShowContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        // this.players 
        this.setPlayer = this.setPlayer.bind(this)
        this.rotateMediaLeft = this.rotateMediaLeft.bind(this)
        this.rotateMediaRight = this.rotateMediaRight.bind(this)
        this.toMedia = this.toMedia.bind(this)
        this.goToSecondOnMedia = this.goToSecondOnMedia.bind(this)
        this.players = []
    }

    componentDidMount() {
        this.setState({
            medias: this.props.medias,
            topMedia: 0,
            playing: this.props.medias.map((medias, index) => {
                return false;
            })
        })
        this.players = this.props.medias.map(
            (media, index) => {
                return null
            })
        this.mediaIdMap = {}
        this.props.medias.map(
            (media, index) => {
                this.mediaIdMap[media.mediaId] = index
            })
    }

    componentWillReceiveProps(props) {
        console.log(props.seek)
        if (props.seek) {
            this.goToSecondOnMedia(props.seek.time, props.seek.mediaId)
        }
    }

    setPlayer = (index, player) => {
        this.players[index] = player
    }

    rotateMediaLeft = () => {
        if (this.state.topMedia != this.state.medias.length - 1) {
            this.toMedia(this.state.topMedia + 1)
        }
        else {
            this.toMedia(0)
        }
    }

    rotateMediaRight = () => {
        if (this.state.topMedia != 0) {
            this.toMedia(this.state.topMedia - 1)
        }
        else {
            this.toMedia(this.state.medias.length - 1)
        }
    }

    toMedia = (index) => {
        let playing = this.state.playing;
        if (this.state.medias[this.state.topMedia].type === 2 || this.state.medias[this.state.topMedia].type === 3) {
            playing[this.state.topMedia] = false
        }
        if (this.state.medias[index].type === 2 || this.state.medias[index].type === 3) {
            playing[index] = true
        }

        this.setState({
            topMedia: index,
            playing : playing
        })


    }

    goToSecondOnMedia = (time, mediaId) => {
        this.toMedia(this.mediaIdMap[mediaId])

        if (this.players[this.mediaIdMap[mediaId]]) {
            this.players[this.mediaIdMap[mediaId]].seekTo(time)
        }

    }


    render() {

        return <div>
            <div className='left-field' >
                <div className='trigger-field' onClick={this.rotateMediaLeft}>
                </div>
            </div>
            <div className='right-field'>
                <div className='trigger-field' onClick={this.rotateMediaRight}>
                </div>
            </div>
            <Container style={{padding: '0 0' }} className='shadow media-container'>
                {this.state.medias
                    ? this.state.medias.map(
                        (media, index) => {
                            switch (media.type) {
                                case 0:
                                    return <ImageCard
                                        url={media.url}
                                        zIndex={
                                            this.state.topMedia === index
                                                ? 1
                                                : 0
                                        }
                                    ></ImageCard>;
                                case 1:
                                    return <ImageCard
                                        url={media.url}
                                        zIndex={
                                            this.state.topMedia === index
                                                ? 1
                                                : 0
                                        }
                                    ></ImageCard>;
                                case 2:
                                    return <VideoCard
                                        url={media.url}
                                        zIndex={
                                            this.state.topMedia === index
                                                ? 1
                                                : 0
                                        }
                                        playing={this.state.playing[index]}
                                        setPlayer={(player) => { this.setPlayer(index, player) }}
                                    ></VideoCard>
                                case 3:
                                    return <VideoCard
                                        url={media.url}
                                        zIndex={
                                            this.state.topMedia === index
                                                ? 1
                                                : 0
                                        }
                                        playing={this.state.playing[index]}
                                        setPlayer={(player) => { this.setPlayer(index, player) }}
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