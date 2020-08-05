import React, { Component } from 'react'
import "../../../node_modules/video-react/dist/video-react.css";
import {Container} from 'react-bootstrap';
import MediaUploadContainer from '../../Containers/Util/MediaUpload/MediaUploadContainer';



class DevPage extends Component {
    constructor(props) {
        super(props)
    }

    setMedia = (medias,files) =>{
        this.setState({medias: medias, files: files}, ()=>{console.log(this.state)})
    }
    


    render() {
        return <Container>
            <MediaUploadContainer setMedia={this.setMedia}/>
        </Container>
    }
}

export default DevPage;