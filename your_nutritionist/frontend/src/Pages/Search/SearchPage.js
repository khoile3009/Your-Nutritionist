import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SigninRequired from '../../Containers/SigninRequired/SigninRequired'
import NewFeedContainer from '../../Containers/NewFeed/NewFeedContainer'
import RecipeSearchbox from '../../Containers/RecipeSearchbox/RecipeSearchbox'
import RecipeList from '../../Containers/RecipeList/RecipeList'
import queryString from 'query-string';
import axios from '../../axios-orders';
import {withRouter} from 'react-router-dom'
import { compose } from 'redux';
class SearchPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            recipes : null,
            search_query: '',
            page: 1,
        }
        this.setRecipes = this.setRecipes.bind(this)
        this.setSearchQuery = this.setSearchQuery.bind(this)
        this.search = this.search.bind(this)
        this.toPage = this.toPage.bind(this)
    }

    componentDidMount = () => {
        console.log(this.state.page)
        if(this.props.location.search){
            let params = queryString.parse(this.props.location.search)
            let query = params.query
            axios.get('api/recipe', {
                params: {
                    query: query,
                    block: Math.floor(parseInt(params.page - 1) / 5)
                }
            })
            .then(
                (response) => {
                    this.setState({
                        recipes: response.data.recipes,
                        query: query,
                        page: parseInt(params.page)
                    })
                }
            )
            this.setState({})
        }
        this.num_preload = 5
    }

    componentWillReceiveProps(props){   
        let next_params = queryString.parse(props.location.search)
        let next_page = parseInt(next_params.page);
        if(Math.floor((next_page - 1)/ this.num_preload) !== Math.floor((this.state.page - 1)/ this.num_preload)){
            axios.get('api/recipe', {
                params: {
                    query: next_params.query,
                    block: Math.floor((next_page - 1)/ this.num_preload)
                }
            })
            .then(
                (response) => {
                    this.setState({
                        recipes: response.data.recipes,
                        query: next_params.query,
                        page: next_page
                    })
                }
            )
        }
        else{
            this.setState({
                page: next_page
            })
        }
        
    }

    setSearchQuery = (event) => {
        this.setState({query: event.target.value})
    }

    search = () => {
        this.props.history.push({pathname: '/search', search: queryString.stringify({query: this.state.query, page: 1})})
    }

    setRecipes = (recipes) => {
        this.setState({recipes : recipes})
    }

    toPage = (page) => {
        console.log(page)
        this.props.history.push({pathname: '/search', search: queryString.stringify({query: queryString.parse(this.props.location.search).query, page: page})})
    }

    render() {
        return <>
            <RecipeSearchbox
                setRecipes = {this.setRecipes}
                setSearchQuery ={this.setSearchQuery}
                query={this.state.query}
                search={this.search}
                
            ></RecipeSearchbox>
            <Container >
                {this.state.recipes
                ? <RecipeList
                    recipes={this.state.recipes}
                    page={this.state.page}
                    toPage={this.toPage}
                ></RecipeList>
                :null
            }
            </Container>


        </>
    }
}
export default withRouter(SearchPage);