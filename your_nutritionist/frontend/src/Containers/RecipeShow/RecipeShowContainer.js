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
        }
        this.getRatings = this.getRatings.bind(this)
        this.getMedias = this.getMedias.bind(this)
        this.setPlayer = this.setPlayer.bind(this)
        this.rotateMediaLeft = this.rotateMediaLeft.bind(this)
        this.rotateMediaRight = this.rotateMediaRight.bind(this)
        this.toMedia = this.toMedia.bind(this)
        this.goToSecondOnMedia = this.goToSecondOnMedia.bind(this)
        this.players = []
    }

    componentDidMount() {
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
        console.log('getratinb')
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
                this.setState({
                    medias: response.data.medias,
                    topMedia: 0
                })
                this.players=response.data.medias.map(
                    (media, index) => {
                        return null
                    })
                this.mediaIdMap = {}
                response.data.medias.map(
                    (media, index) => {
                        this.mediaIdMap[media.mediaId] = index 
                    })
            }
        )
    }

    setPlayer = (index, player) => {
        this.players[index] = player
    }

    rotateMediaLeft = () => {
        if(this.state.topMedia != this.state.medias.length - 1){
            this.toMedia(this.state.topMedia + 1)
        }
        else {
            this.toMedia(0)
        }
    }

    rotateMediaRight = () => {
        if(this.state.topMedia != 0){
            this.toMedia(this.state.topMedia - 1)
        }
        else {
            this.toMedia(this.state.medias.length - 1)
        }
    }

    toMedia = (index) => {
        console.log(this.state.medias)
        console.log(this.players)
        if(this.state.medias[this.state.topMedia].type === 2 || this.state.medias[this.state.topMedia].type === 3){
            this.players[this.state.topMedia].pause()
        }
        if(this.state.medias[index].type === 2 || this.state.medias[index].type === 3){
            this.players[index].play()
        }
        this.setState({topMedia: index})

    }

    goToSecondOnMedia = (time, mediaId) => {
        this.toMedia(this.mediaIdMap[mediaId])
        console.log(this.mediaIdMap[mediaId])
        if(this.players[this.mediaIdMap[mediaId]]){
            // console.log()
            this.players[this.mediaIdMap[mediaId]].seek(time)
        }
        
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

                    rotateMediaLeft={this.rotateMediaLeft}
                    rotateMediaRight={this.rotateMediaRight}
                    ></MediaShowContainer>
                    : null
                }
                <button onClick={()=>{this.goToSecondOnMedia(20,20)}}>afdf</button>
                <Container className='shadow  custom-container recipe' fluid='sm'>
                    <RecipeShow recipe={this.state.recipe} goToSecondOnMedia={this.goToSecondOnMedia}></RecipeShow>
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