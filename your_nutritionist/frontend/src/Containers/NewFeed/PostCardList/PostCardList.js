import React, { Component } from "react";
import PostCardContainer from "../PostCard/PostCardContainer";
import { Link, withRouter } from "react-router-dom";
import {Button} from 'react-bootstrap'
class PostCardList extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <>
        {this.props.posts.map((post, index) => {
            return (
                <PostCardContainer
                    post={post}
                />
            );
        })}
        <Button onClick={this.props.loadPosts}>Load more post</Button>
        </>
    }
}

export default withRouter(PostCardList);
