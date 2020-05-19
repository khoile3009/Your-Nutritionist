import React, { Component } from 'react';
import axios from '../../axios-orders';


import NullPage from '../../Components/NullPage/NullPage'

import { Container } from 'react-bootstrap'
import UserInfo from '../../Components/UserShow/UserInfo/UserInfo'
import RecipeList from '../RecipeList/RecipeList'
import './UserShow.css'
class UserShowContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_info: null
        }
        this.getUserRecipe = this.getUserRecipe.bind(this)

    }

    componentDidMount() {
        axios.get('api/user/' + this.props.match.params['user_id'] + '/info')
            .then(
                (response) => {
                    this.setState({ user_info: response.data })
                    this.getUserRecipe()
                }
            )
    }

    getUserRecipe() {
        axios.get('api/recipe', {
            params: {
                user_id: this.props.match.params['user_id']
            }
        })
            .then(
                (response) => {
                    console.log(response)
                    this.setState({ user_recipes: response.data.recipe })
                    console.log(this.state)
                }
            )
    }



    render() {
        return (this.state.user_info)
            ? <Container className="shadow custom-container">
                <UserInfo
                    user_info={this.state.user_info}
                ></UserInfo>
                {
                    this.state.user_recipes
                        ? <RecipeList
                            recipes={this.state.user_recipes}
                        ></RecipeList>
                        : <h1>No recipes</h1>
                }

            </Container>
            : <NullPage></NullPage>
    }

}

export default UserShowContainer;