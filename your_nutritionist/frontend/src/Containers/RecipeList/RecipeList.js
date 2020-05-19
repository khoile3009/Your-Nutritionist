import React, {Component} from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from '../../axios-orders';

import RecipeCard from '../../Components/RecipeCard/RecipeCard'
import './RecipeList.css'

class RecipeList extends Component {

    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            recipes: props.recipes
        }
        console.log(this.props.history)
    }

    

    render(){
        let recipe_cards = []
        if (this.state.recipes) {
            for(var row_index = 0; row_index < Math.round(this.state.recipes.length); row_index++){
                let recipes_row = []
                let num_col = Math.min(2, this.state.recipes.length -  row_index * 2)
                for(var col_index = 0; col_index < num_col; col_index++){
                    let recipe = this.state.recipes[row_index * 2 + col_index]
                    recipes_row.push(<Col>
                        <RecipeCard 
                            thumbnail={recipe.thumbnail}
                            name={recipe.name}
                            recipe_id={recipe.recipe_id}
                            number_person={recipe.number_person}
                            cook_time={recipe.cook_time}
                            likes={recipe.likes}
                        ></RecipeCard>
                    </Col>)
                }
                if (num_col === 1){
                    recipes_row.push(<Col><div className='filler'></div></Col>)
                }
                recipe_cards.push(<Row className='recipe-row'>
                    {recipes_row}
                </Row>)
            }
        }
        else{
            recipe_cards = <h1>No recipe</h1>
        }
        
        


        return recipe_cards

    }
}

export default RecipeList;
