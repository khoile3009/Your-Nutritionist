import React, { Component } from 'react'
import axios from '../../axios-orders';

import RecipeShow from '../../Components/RecipeShow/RecipeShow'
import NullPage from '../../Components/NullPage/NullPage'
import RecipeRatingContainer from '../RecipeRating/RecipeRatingContainer'
import MediaShowContainer from '../MediaShow/MediaShowContainer'
import { Container } from 'react-bootstrap'

import { withRouter } from 'react-router-dom';

class RecipeShowContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seek: null
        }
        this.getRatings = this.getRatings.bind(this)
        this.getMedias = this.getMedias.bind(this)
        this.goToSecondOnMedia = this.goToSecondOnMedia.bind(this)   
    }

    componentDidMount() {
        this.mediaContainer = React.createRef();
        let params = this.props.match.params

        axios.get('api/recipe/' + params['recipe_id'] + '/info')
            .then(
                (response) => {
                    this.setState({ recipe: response.data })
                    this.getRatings()
                    this.getMedias()
                }
            )
    }

    getRatings() {
        let params = this.props.match.params

        axios.get('api/recipe/' + params['recipe_id'] + '/rate/all')
            .then(
                (response) => {
                    this.setState({ ratings: response.data.ratings })
                }
            )
    }

    getMedias() {
        let params = this.props.match.params
        axios.get('api/recipe/' + params['recipe_id'] + '/media')
        .then(
            (response) =>{
                this.setState({medias:response.data.medias})
            }
        )
    }

    goToSecondOnMedia = (time, mediaId) => {
        console.log('recipe_show')
        this.setState({seek: {time: time, mediaId: mediaId}})
    }


    render() {
        return this.state.recipe
            ?
            <>
                {this.state.medias
                    ? <MediaShowContainer 
                    medias={this.state.medias}
                    topMedia={this.state.topMedia}
                    setPlayer={this.setPlayer}
                    seek={this.state.seek}
                    rotateMediaLeft={this.rotateMediaLeft}
                    rotateMediaRight={this.rotateMediaRight}
                    ></MediaShowContainer>
                    : null
                }
                
                <Container className='shadow custom-container recipe' fluid='sm'>
                    <RecipeShow 
                    recipe={this.state.recipe} 
                    goToSecondOnMedia={this.goToSecondOnMedia}></RecipeShow>
                    <hr></hr>
                    <RecipeRatingContainer
                        ratings={this.state.ratings}
                        recipeId={this.props.match.params['recipe_id']}
                        getRatings={this.getRatings}
                        creatorId={this.state.recipe.creator_id}
                    ></RecipeRatingContainer>
                </Container>
            </>
            :
            <NullPage></NullPage>  //Update this to null page
    }

}

export default withRouter(RecipeShowContainer);