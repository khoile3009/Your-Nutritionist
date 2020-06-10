import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SigninRequired from '../../Containers/SigninRequired/SigninRequired'
import NewFeedContainer from '../../Containers/NewFeed/NewFeedContainer'
import RecipeSearchbox from '../../Containers/RecipeSearchbox/RecipeSearchbox'
import RecipeList from '../../Containers/RecipeList/RecipeList'
class HomePage extends Component {

    constructor(props){
        super(props)
        this.state = {
            recipes : null,
        }
        this.setRecipes = this.setRecipes.bind(this)
    }

    setRecipes = (recipes) => {
        this.setState({recipes : recipes})
    }

    render() {
        return <>
            <RecipeSearchbox
                setRecipes = {this.setRecipes}
            ></RecipeSearchbox>
            <Container className='shadow custom-container'>
                {this.state.recipes
                ? <RecipeList
                    recipes={this.state.recipes}
                ></RecipeList>
                :null
            }
            </Container>


        </>
    }
}
export default HomePage;