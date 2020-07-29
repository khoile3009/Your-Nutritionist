import React, { Component } from "react";
import PostCardContainer from "../PostCard/PostCardContainer";
import { Link, withRouter } from "react-router-dom";

class PostCardList extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return this.props.posts.map((post, index) => {
            return (
                <PostCardContainer
                    post={post}
                />
            );
        });
    }
}

export default withRouter(PostCardList);
