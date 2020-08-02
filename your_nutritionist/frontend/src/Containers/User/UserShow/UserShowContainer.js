import React, { Component } from "react";
import axios from "../../../axios-orders";
import { withRouter } from "react-router-dom";

import NullPage from "../../../Components/Util/NullPage/NullPage";

import { Container } from "react-bootstrap";
import UserInfoContainer from "../UserInfo/UserInfoContainer";
import RecipeList from "../../Recipe/RecipeList/RecipeList";
import UserIntroductionContainer from "../UserIntroduction/UserIntroductionContainer";
import "./UserShow.scss";
import { connect } from "react-redux";
import queryString from "query-string";
import PostCardList from "../../NewFeed/PostCardList/PostCardList";
import RightBarContainer from "../../RightBar/RightBarContainer";
import SideBarContainer from "../../SideBar/SideBarContainer";

class UserShowContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			tab_active: false,
			tab: "recipe",
			posts: [],
			last_id: -1,
		};
		this.getUserRecipes = this.getUserRecipes.bind(this);
		this.getUserActions = this.getUserActions.bind(this);
		this.toPage = this.toPage.bind(this);
		this.updateProfilePic = this.updateProfilePic.bind(this);
		this.updateHeadline = this.updateHeadline.bind(this);
		this.loadPosts = this.loadPosts.bind(this);
		this.switchTab = this.switchTab.bind(this);
	}

	componentDidMount() {
		let headers = {
			"Content-Type": "application/json",
			Authorization: "Token " + this.props.token,
		};
		let page = 1;
		if (this.props.location.search) {
			let params = queryString.parse(this.props.location.search);
			page = parseInt(params.page);
			console.log(page);
		}
		axios
			.get("api/user/" + this.props.match.params["user_id"] + "/info", { headers: headers })
			.then((response) => {
				console.log(response);
				this.setState({ user_info: response.data });
				this.getUserRecipes(page);
				this.loadPosts();
			})
			.catch((err) => {
				console.log(err);
			});
		this.num_preload = 5;
	}

	componentWillReceiveProps(props) {
		console.log("props");
		let next_params = queryString.parse(props.location.search);
		let next_page = parseInt(next_params.page);
		if (!isNaN(next_page)) {
			if (Math.floor((next_page - 1) / this.num_preload) !== Math.floor((this.state.page - 1) / this.num_preload)) {
				console.log(next_page);
				this.getUserRecipes(next_page);
			} else {
				this.setState({
					page: next_page,
				});
			}
		}
	}

	loadPosts = () => {
		if (this.props.token) {
			let headers = {
				"Content-Type": "application/json",
				Authorization: "Token " + this.props.token,
			};

			axios
				.get("api/post", {
					headers: headers,
					params: {
						before_id: this.state.last_id,
						type: "user",
						user_id: this.props.match.params["user_id"],
						limit: 5,
					},
				})
				.then((response) => {
					let posts = this.state.posts;
					posts.push.apply(posts, response.data.posts);
					console.log(response.data.posts[response.data.posts.length - 1].post_id);
					this.setState({ posts: posts, last_id: response.data.posts[response.data.posts.length - 1].post_id });
					// this.setState({ posts: posts})
				});
		}
	};
	// componentWillReceiveProps(){

	//     this.setState({
	//         user_info:null,
	//         user_actions:null,
	//         user_recipes:null
	//     })
	//     let headers = {
	//         'Content-Type': 'application/json',
	//         'Authorization': 'Token ' + this.props.token
	//     }
	//     axios.get('api/user/' + this.props.match.params['user_id'] + '/info', { headers: headers })
	//         .then(
	//             (response) => {
	//                 this.setState({ user_info: response.data })
	//                 this.getUserRecipes()
	//                 this.getUserActions()
	//             }
	//         )
	//         .catch(
	//             (err) => {
	//                 console.log(err)
	//             }
	//         )
	// }

	getUserRecipes = (page) => {
		axios
			.get("api/recipe", {
				params: {
					user_id: this.props.match.params["user_id"],
					block: Math.floor((page - 1) / this.num_preload),
				},
			})
			.then((response) => {
				console.log(response);
				this.setState(
					{
						user_recipes: response.data.recipes,
						page: page,
					},
					() => {
						console.log("a");
					}
				);
			});
	};

	getUserPost;

	getUserActions = () => {
		let headers = {
			"Content-Type": "application/json",
			Authorization: "Token " + this.props.token,
		};
		axios.get("api/user/" + this.props.match.params["user_id"] + "/action", { headers: headers }).then((response) => {
			this.setState({ user_actions: response.data.actions });
		});
	};

	toPage = (page) => {
		this.props.history.push({ pathname: "/user/" + this.props.match.params["user_id"], search: queryString.stringify({ page: page }) });
	};

	updateProfilePic = (url) => {
		this.setState({ user_info: { ...this.state.user_info, profilepic: url } });
	};
	updateHeadline = (headline) => {
		this.setState({ user_info: { ...this.state.user_info, headline: headline } });
	};

	switchTab = (tab) => {
		this.setState({ tab: tab });
	};

	render() {
		let content = null;
		console.log(this.state.tab);
		switch (this.state.tab) {
			case "recipe":
				content = this.state.user_recipes ? <RecipeList recipes={this.state.user_recipes} page={this.state.page} toPage={this.toPage}></RecipeList> : <h3 style={{ color: "#757575" }}>No recipes</h3>;
				break;
			case "post":
				content =
					this.state.posts.length != 0 ? (
						<>
							<br></br>
							<PostCardList posts={this.state.posts} loadPosts={this.loadPosts} />
						</>
					) : (
						<div className="no-content">
							<h3 style={{ color: "#757575" }}>No posts</h3>
						</div>
					);
				break;
			default:
				content = this.state.user_recipes ? (
					<RecipeList recipes={this.state.user_recipes} page={this.state.page} toPage={this.toPage}></RecipeList>
				) : (
					<div className="no-content">
						<h3 style={{ color: "#757575" }}>No recipes</h3>
					</div>
				);
				break;
		}
		return this.state.user_info ? (
			<Container className="user-wrapper">
				<SideBarContainer></SideBarContainer>
				<RightBarContainer></RightBarContainer>
				<UserInfoContainer updateHeadline={this.updateHeadline} updateProfilePic={this.updateProfilePic} user_info={this.state.user_info} userId={parseInt(this.props.match.params["user_id"])}></UserInfoContainer>

				<UserIntroductionContainer userId={parseInt(this.props.match.params["user_id"])}></UserIntroductionContainer>
				<br></br>
				<hr />
				<div className="user-content-wrapper">
					<span
						className={this.state.tab == "recipe" ? "subtitle content-nav content-nav-active" : "subtitle content-nav"}
						onClick={() => {
							this.switchTab("recipe");
						}}
					>
						Recipes
					</span>
					<span
						className={this.state.tab == "post" ? "subtitle content-nav content-nav-active" : "subtitle content-nav"}
						onClick={() => {
							this.switchTab("post");
						}}
					>
						Posts
					</span>
				</div>
				<div className="recipe-list-wrapper">{content}</div>
				<div></div>
				{/* <hr></hr>
				<p className="subtitle">Actions</p>
				{this.props.token ? this.state.user_actions ? <ActionList actions={this.state.user_actions}></ActionList> : <h1>No action recently</h1> : <h1>You need to sign in to see this content</h1>} */}
			</Container>
		) : (
			<NullPage></NullPage>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, () => {})(withRouter(UserShowContainer));
