import React, { Component } from 'react'
import MediaPreviewCard from '../../../../Components/Util/MediaPreviewCard/MediaPreviewCard';

class MediaPreviewList extends Component {
    render() {
        return <>
            {this.props.medias.map(
                (media, index) => {
                    return <MediaPreviewCard 
                    active={this.props.current == index} 
                    media={media} 
                    changeCurrentMedia={()=>{this.props.changeCurrentMedia(index)}}
                    />
                }
            )}
            <MediaPreviewCard 
            active={this.props.current == this.props.medias.length} 
            media={null} 
            changeCurrentMedia={()=>{this.props.changeCurrentMedia(this.props.medias.length)}}/>
        </>
    }
}

export default MediaPreviewList;