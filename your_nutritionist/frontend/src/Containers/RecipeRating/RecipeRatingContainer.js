import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import RatingHeader from '../../Components/Rating/RatingHeader/RatingHeader'
import RatingCard from '../../Components/Rating/RatingCard/RatingCard'
import RatingFormCard from '../../Components/Rating/RatingFormCard/RatingFormCard'
import Popup from 'reactjs-popup'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

class RecipeRatingContainer extends Component {


    constructor(props) {
        super(props)
        this.state = {
            showForm: false,
            your_rating: {
                rated: false,
                rating: '',
                comment: '',
            }
        }
        this.toggleFormCard = this.toggleFormCard.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handleCommentChange = this.handleCommentChange.bind(this)
        this.submitRating = this.submitRating.bind(this)
        this.getIsRated = this.getIsRated.bind(this)
        this.canRate = this.canRate.bind(this)
    }

    componentDidMount(){
        if(this.canRate()){
            this.getIsRated()
        }
        
    }

    toggleFormCard = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    handleRatingChange = (event) => {
        this.setState({
            your_rating: {
                ...this.state.your_rating,
                rating: event.target.value
            }
        })
    }

    handleCommentChange = (event) => {
        this.setState({
            your_rating: {
                ...this.state.your_rating,
                comment: event.target.value
            }
        })
    }

    getIsRated = () => {
        axios.get('/api/recipe/' + this.props.recipeId + '/israted/' + this.props.userId)
        .then(
            (response) => {
                if(response.data.rated){
                    console.log(response.data)
                    this.setState({your_rating: response.data})
                }
                
            }
        )
    }

    submitRating = (event) => {
        event.preventDefault()
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token
        }
        let data = {
            rating: parseInt(this.state.your_rating.rating),
            comment: this.state.your_rating.comment
        }
        let url = '/api/recipe/' + this.props.recipeId + '/rate'
        if(this.state.your_rating.rated){
            axios.put(
                url,
                data,
                { headers: headers }
            )
                .then(
                    (response) => {
                        this.props.getRatings()
                        this.setState({
                            your_rating: {
                                rating: '',
                                comment: ''
                            }
                        })
                        this.toggleFormCard()
                    }
                )
        }
        axios.post(
            url,
            data,
            { headers: headers }
        )
            .then(
                (response) => {
                    this.props.getRatings()
                    this.setState({
                        your_rating: {
                            rating: '',
                            comment: ''
                        }
                    })
                    this.toggleFormCard()
                }
            )
    }

    

    canRate = () =>{
        return (this.props.userId && this.props.creatorId != this.props.userId)
    }

    render() {
        return <>
            <RatingHeader
                toggleFormCard={this.toggleFormCard}
                isRated = {this.state.your_rating.rated}
                canRate = {this.canRate()}
            ></RatingHeader>
            {
                this.state.showForm
                    ? <RatingFormCard
                        your_rating={this.state.your_rating}
                        handleCommentChange={this.handleCommentChange}
                        handleRatingChange={this.handleRatingChange}
                        submitRating={this.submitRating}
                    ></RatingFormCard>
                    : null
            }
            {this.props.ratings
                ? this.props.ratings.map(
                    (rating, index) => {
                        return <RatingCard rating={rating}></RatingCard>
                    }
                )
                : <h1>No rating</h1>
            }
        </>
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(RecipeRatingContainer);