import React, {Component} from 'react'
import './MediaUploadContainer.css';
import $ from 'jquery'
import MediaPreviewList from './MediaPreviewList/MediaPreviewList';
class MediaUploadContainer extends Component{

    constructor(props){
        super(props)
        this.uploadButtonClick = this.uploadButtonClick.bind(this)
    }

    uploadButtonClick = () => {
        $('.file-input').click()
    }



    render(){
        return <div className="media-upload-container"> 
            {/* <div className='input-click-div clickable' onDra onClick={this.uploadButtonClick}></div>
            <input type="file" className='file-input' ></input> */}
            <input type="file" className='file-input' ></input>
            <MediaPreviewList/>
        </div>;
    }
}

export default MediaUploadContainer;