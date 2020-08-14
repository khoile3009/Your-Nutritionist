import React, { Component } from "react";
import PostCardContainer from "../PostCard/PostCardContainer";
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./PostCardList.scss";
class PostCardList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="post-card-list-wrapper">
				{this.props.posts.map((post, index) => {
					return <PostCardContainer post={post} />;
				})}
				<Button onClick={this.props.loadPosts}>Load more post</Button>
			</div>
		);
	}
}

export default withRouter(PostCardList);
