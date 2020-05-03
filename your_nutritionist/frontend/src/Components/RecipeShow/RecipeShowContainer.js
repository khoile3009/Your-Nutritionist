import React, { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../constants'

import RecipeShow from './RecipeShow'

class RecipeShowContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: null
        }
    }

    componentDidMount() {
        let params = this.props.match.params
        // params['recipe_id'] = parseInt(params['recipe_id'])
        console.log(params)
        axios.get(BASE_URL + 'api/recipe/' + params['recipe_id'] + '/',

        ).then(
            (response) => {
                this.setState({recipe: response.data})
            }
        )   
    }
    render() {
        return this.state.recipe ? 
        <RecipeShow recipe={this.state.recipe}></RecipeShow> :
        <h1>Nothing here</h1>
    }

}

export default RecipeShowContainer;