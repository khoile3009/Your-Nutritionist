import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import './DevPage.css';
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