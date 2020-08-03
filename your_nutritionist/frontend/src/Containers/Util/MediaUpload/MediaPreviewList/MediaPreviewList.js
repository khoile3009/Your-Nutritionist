import React, {Component} from 'react';
import MediaPreviewCard from '../../../../Components/Util/MediaPreviewCard/MediaPreviewCard';
import './MediaPreviewList.css'
class MediaPreviewList extends Component{
    render(){
        return <div className='media-preview-list'>
            <MediaPreviewCard/>
            <MediaPreviewCard/>
            <MediaPreviewCard/>
            <MediaPreviewCard/>
            <MediaPreviewCard/>
            <MediaPreviewCard/>
            <MediaPreviewCard/>
            <MediaPreviewCard/>
        </div>
    }
}

export default MediaPreviewList;