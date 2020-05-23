import React, { Component } from 'react';
import axios from '../../axios-orders';
import {withRouter} from 'react-router-dom'

import NullPage from '../../Components/NullPage/NullPage'

import { Container } from 'react-bootstrap'
import UserInfoContainer from '../UserInfo/UserInfoContainer'
import RecipeList from '../RecipeList/RecipeList'
import ActionList from '../ActionList/ActionList';
import UserIntroductionContainer from '../UserIntroduction/UserIntroductionContainer';
import './UserShow.css'
import { connect } from 'react-redux';

class UserShowContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exist : null,
            loading: true
        }
        this.getUserRecipes = this.getUserRecipes.bind(this)
        this.getUserActions = this.getUserActions.bind(this)
        this.success = this.success.bind(this)
        this.fail = this.fail.bind(this)
    }

    success = () => {
        this.setState({exist: true, loading: false})
        this.getUserRecipes()
        this.getUserActions()
    }

    fail = () => {
        console.log('fail')
        this.setState({exist: false,  loading: false})
    }

    getUserRecipes = () => {
        axios.get('api/recipe', {
            params: {
                user_id: this.props.match.params['user_id']
            }
        })
            .then(
                (response) => {
                    this.setState({ user_recipes: response.data.recipe })
                }
            )
    }

    getUserActions = () => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token
        }
        axios.get('api/user/' + this.props.match.params['user_id'] + '/action', {headers: headers})
        .then(
            (response) => {
                this.setState({user_actions: response.data.actions})
            }
        )
    }

    

    render() {
        return (this.state.loading == true || this.state.exist == true)
            ? <Container className="shadow custom-container">
                <UserInfoContainer
                    success = {this.success}
                    fail = {this.fail}
                    userId = {parseInt(this.props.match.params['user_id'])}
                ></UserInfoContainer>
                <hr></hr>
                <UserIntroductionContainer></UserIntroductionContainer>
                <hr></hr>
                <p className='subtitle'>Recipes</p>
                {
                    this.state.user_recipes
                        ? <RecipeList
                            recipes={this.state.user_recipes}
                        ></RecipeList>
                        : <h1>No recipes</h1>
                }
                <hr></hr>
                <p className='subtitle'>Actions</p>
                { this.props.token
                ? this.state.user_actions
                    ? <ActionList
                        actions={this.state.user_actions}
                    ></ActionList>
                    : <h1>No action recently</h1>
                : <h1>You need to sign in to see this content</h1>
                }
            </Container>
            : <NullPage></NullPage>
    }

}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps,() => {})(withRouter(UserShowContainer));