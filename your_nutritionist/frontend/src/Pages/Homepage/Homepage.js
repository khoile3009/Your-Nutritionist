import React, { Component } from "react";
import RecipeSearchbox from "../../Containers/Recipe/RecipeSearchbox/RecipeSearchbox";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import "./Homepage.css";
import SideBarContainer from "../../Containers/SideBar/SideBarContainer.js";
import PostCardList from "../../Containers/NewFeed/PostCardList/PostCardList";
import RightBarContainer from "../../Containers/RightBar/RightBarContainer"
import { connect } from 'react-redux';
import axios from '../../axios-orders';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      search_query: '',
      page: 1,
      posts: [],
      last_id: -1,
      none_left: false
    };
    this.setRecipes = this.setRecipes.bind(this)
    this.setSearchQuery = this.setSearchQuery.bind(this)
    this.search = this.search.bind(this)
    this.toPage = this.toPage.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
  }

  componentDidMount = () => {
    this.loadPosts()
  };

  loadPosts = () => {
    if (this.props.token) {
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.props.token
      }

      axios.get(
        'api/post',
        {
          headers: headers,
          params: {
            before_id: this.state.last_id,
            type: 'feed',
            limit: 5,
          }
        }
      ).then(
        (response) => {
          let posts = this.state.posts
          if(response.data.posts && response.data.posts.length != 0){
            posts.push.apply(posts, response.data.posts)
            this.setState({ posts: posts, last_id: response.data.posts[response.data.posts.length - 1].post_id })
          }
        
          // this.setState({ posts: posts})
        }
      )
    }
  }

  

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
          <PostCardList posts={this.state.posts} loadPosts={this.loadPosts} />
          <RightBarContainer></RightBarContainer>
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

export default connect(mapStateToProps, () => { })(withRouter(Homepage));
