import React, { Component } from "react";
import RecipeSearchbox from "../../Containers/Recipe/RecipeSearchbox/RecipeSearchbox";
import queryString from "query-string";
import { withRouter} from "react-router-dom";
import "./Homepage.css";
import SideBarContainer from "../../Containers/SideBar/SideBarContainer.js";
import PostCardList from "../../Containers/NewFeed/PostCardList/PostCardList";
import {connect} from 'react-redux';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      search_query: '',
      page: 1,
      posts: [],
      last_id: -1
    };
    this.setRecipes = this.setRecipes.bind(this)
    this.setSearchQuery = this.setSearchQuery.bind(this)
    this.search = this.search.bind(this)
    this.toPage = this.toPage.bind(this)
  }

  componentDidMount = () => {
    this.setState({
      posts: [
        {
          user_id: 1,
          username: "HA",
          profilepic:
            "https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          likes: 69420,
          comments: 690,
          medias: [1, 2, 3, 4, 5],
          num_like: 20,
          num_comment: 20,
        },
        {
          user_id: 2,
          username: "HAN",
          profilepic:
            "https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          likes: 69420,
          comments: 690,
          medias: [1, 2, 3, 4, 5],
          num_like: 20,
          num_comment: 20,
        },
        {
          user_id: 3,
          username: "HANG",
          profilepic:
            "https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          likes: 69420,
          comments: 690,
          medias: [1, 2, 3, 4, 5],
          num_like: 20,
          num_comment: 20,
        },
      ]
    })
  };

  componentWillReceiveProps(props) { }

  setSearchQuery = (event) => {
    this.setState({ query: event.target.value })
  }

  search = () => {
    this.props.history.push({ pathname: '/search', search: queryString.stringify({ query: this.state.query, page: 1 }) })
  }

  setRecipes = (recipes) => {
    this.setState({ recipes: recipes })
  }


  // Not needed?
  toPage = (page) => {
    console.log(page)
    this.props.history.push({ pathname: '/search', search: queryString.stringify({ query: queryString.parse(this.props.location.search).query, page: page }) })
  }

  loadPosts = (last_id) => {

  }

  render() {

    return (
      <>
        <RecipeSearchbox
          setRecipes={this.setRecipes}
          setSearchQuery={this.setSearchQuery}
          query={this.state.query}
          search={this.search}
        />
        <div className="overall-layout">
          <SideBarContainer />
          <PostCardList posts={this.state.posts} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      id: state.auth.userId
  }
}

export default connect(mapStateToProps,()=>{})(withRouter(Homepage));
