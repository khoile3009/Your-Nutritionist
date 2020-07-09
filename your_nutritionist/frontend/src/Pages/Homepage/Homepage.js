import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SigninRequired from "../../Containers/SigninRequired/SigninRequired";
import NewFeedContainer from "../../Containers/NewFeed/NewFeedContainer";
import RecipeSearchbox from "../../Containers/RecipeSearchbox/RecipeSearchbox";

import queryString from "query-string";
import axios from "../../axios-orders";
import { withRouter, useLocation } from "react-router-dom";
import { compose } from "redux";
import "./Homepage.css";
import TrendingSection from "../../Containers/HomepageCardsSection/TrendingSection";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
            search_query: '',
            page: 1,
        };
        this.setRecipes = this.setRecipes.bind(this)
        this.setSearchQuery = this.setSearchQuery.bind(this)
        this.search = this.search.bind(this)
        this.toPage = this.toPage.bind(this)
    }

    componentDidMount = () => {};

    componentWillReceiveProps(props) {}

    setSearchQuery = (event) => {
        this.setState({ query: event.target.value })
    }

    search = () => {
        this.props.history.push({ pathname: '/search', search: queryString.stringify({ query: this.state.query, page: 1 }) })
        console.log("nigga")
    }

    setRecipes = (recipes) => {
        this.setState({ recipes: recipes })
    }

    toPage = (page) => {
        console.log(page)
        this.props.history.push({ pathname: '/search', search: queryString.stringify({ query: queryString.parse(this.props.location.search).query, page: page }) })
    }

    render() {
        return (
            <>
                <RecipeSearchbox>
                    setRecipes = {this.setRecipes}
                    setSearchQuery ={this.setSearchQuery}
                    query={this.state.query}
                    search={this.search}
                </RecipeSearchbox>
                <div className="homepage-section-container">
                    <TrendingSection></TrendingSection>
                </div>
            </>
        );
    }
}

export default withRouter(Homepage);
