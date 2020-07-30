import React from 'react';
import './NewFeedCard.scss';
import ReactPlayer from 'react-player';
const PostImage = (props) => {
	return <div className='post-media-content' style={{
        backgroundImage: "url('" + props.url + "')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
    }}/>
};

const PostVideo = (props) => {
	return <div className='post-media-content'>
		<ReactPlayer
            url={props.url}
            height='100%'
            width='100%'
            controls={true}
        />
	</div>
};

const PostMedia = (props) => {
	return props.media.type == 2 || props.media.type == 3
		? <PostVideo url={props.media.url}/>
		: <PostImage url={props.media.url}/>
	
}
export default PostMedia;
