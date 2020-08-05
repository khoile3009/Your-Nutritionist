import React from 'react'
import "./MediaPreviewCard.scss"
const MediaPreviewCard = (props) => {
    let backgroundImage = 
        props.media
        ?
            props.media.type == 0 || props.media.type == 1
            ? props.media.url
            // Put a video icon here
            : null
        :'' 
    let classes = [
        props.active? 'media-preview-card-current': 'clickable',
        props.media?'media-preview-card': 'media-add'
    ]
    
    return <div 
    className= {classes.join(' ')}
    style={{backgroundImage: "url('" + backgroundImage + "')"}}
    onClick={props.changeCurrentMedia}
    ></div>
    
}

export default MediaPreviewCard