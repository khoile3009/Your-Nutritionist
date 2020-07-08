import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SigninRequired from "../../Containers/SigninRequired/SigninRequired";
import NewFeedContainer from "../../Containers/NewFeed/NewFeedContainer";
import RecipeSearchbox from "../../Containers/RecipeSearchbox/RecipeSearchbox";
import RecipeList from "../../Containers/RecipeList/RecipeList";
import queryString from "query-string";
import axios from "../../axios-orders";
import { withRouter, useLocation } from "react-router-dom";
import { compose } from "redux";
import HomepageCard from "../../Components/HomepageCard/HomepageCard";
import "./Homepage.css";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {};

    componentWillReceiveProps(props) {}

    render() {
        return (
            <>
                <RecipeSearchbox>
                    setRecipes = {this.setRecipes}
                    setSearchQuery ={this.setSearchQuery}
                    query={this.state.query}
                    search={this.search}
                </RecipeSearchbox>

                <Container className="trending-recipes-container">
                    {/* <TrendingRecipes></TrendingRecipes> */}
                </Container>

                <Container className="">
                    {/* <WhatToDo></WhatToDo> */}
                </Container>
            </>
        );
    }
}

export default withRouter(Homepage);
