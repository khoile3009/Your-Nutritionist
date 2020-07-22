import React, { Component } from 'react';
import NewFeedCard from '../../../Components/NewFeed/NewFeedCard';
import { Link, withRouter } from 'react-router-dom';

class NewFeedList extends Component {
	constructor(props) {
		super(props);
		this.to_creator = this.to_creator.bind(this);
	}

	to_creator = (creator_id, event) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.history.push('/user/' + creator_id);
	};

	render() {
		let fakeNewFeed = [
			{
				user_id: 1,
				username: 'HA',
				profilepic: 'https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg',
				content: 'lorem ipsum',
				likes: 69420,
				comments: 690,
				medias: [ 1, 2, 3, 4, 5 ]
			},
			{
				user_id: 2,
				username: 'HAN',
				profilepic: 'https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg',
				content: 'lorem ipsum 2',
				likes: 69420,
				comments: 690,
				medias: [ 1, 2, 3, 4, 5 ]
			},
			{
				user_id: 3,
				username: 'HANG',
				profilepic: 'https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg',
				content: 'lorem ipsum 3',
				likes: 69420,
				comments: 690,
				medias: [ 1, 2, 3, 4, 5 ]
			}
		];
		return fakeNewFeed.map((post, index) => {
			return (
				<NewFeedCard
					post={post}
					to_creator={(event) => {
						this.to_creator(post.user_id, event);
					}}
				/>
			);
		});
	}
}

export default withRouter(NewFeedList);
