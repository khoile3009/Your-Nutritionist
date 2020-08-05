import React, { Component } from 'react'
import "../../../node_modules/video-react/dist/video-react.css";
import {Container} from 'react-bootstrap';
import MediaUploadContainer from '../../Containers/Util/MediaUpload/MediaUploadContainer';



class DevPage extends Component {
    constructor(props) {
        super(props)
    }
    


    render() {
        return <Container>
            <MediaUploadContainer/>
        </Container>
    }
}

export default DevPage;