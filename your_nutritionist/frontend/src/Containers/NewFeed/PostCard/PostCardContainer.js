import React, { Component } from 'react';
import { PostContent, PostInteraction, PostMedia, PostProfilePic, PostUsername } from '../../../Components/NewFeed/PostCard/index';
import { withRouter } from 'react-router-dom';
class PostCardContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMedia: 0
        }
        this.toCreator = this.toCreator.bind(this)
    }

    toCreator = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.history.push('/user/' + this.props.post.user_id)
    }

    render() {
        return <div className="card newfeedcard-wrapper container">
            <PostProfilePic
                profilepic={this.props.post.profilepic}
                toCreator={this.toCreator}
            />
            <PostUsername
                username={this.props.post.username}
                toCreator={this.toCreator}
            />
            <PostContent 
            content={this.props.post.content}
            />
            {this.props.post.medias && this.props.post.medias.length != 0
                ? <PostMedia/>
                : null
            }
            
            <PostInteraction 
                num_like = {this.props.post.num_like}
                num_comment = {this.props.post.num_comment}
            />

        </div>
    }
}
export default withRouter(PostCardContainer);