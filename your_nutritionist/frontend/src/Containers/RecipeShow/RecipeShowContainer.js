import React, { Component } from 'react'
import axios from '../../axios-orders';

import RecipeShow from '../../Components/RecipeShow/RecipeShow'
import NullPage from '../../Components/NullPage/NullPage'
class RecipeShowContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: null
        }
    }

    componentDidMount() {
        let params = this.props.match.params

        axios.get('api/recipe/' + params['recipe_id'] + '/info')
        .then(
            (response) => {
                this.setState({recipe: response.data})
            }
        )   
    }
    render() {
        return this.state.recipe ? 
        <RecipeShow recipe={this.state.recipe}></RecipeShow> :
        <NullPage></NullPage>  //Update this to null page
    }

}

export default RecipeShowContainer;