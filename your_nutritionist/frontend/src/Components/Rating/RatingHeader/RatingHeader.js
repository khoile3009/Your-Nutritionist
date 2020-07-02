import React from 'react';
import { Button } from 'react-bootstrap'
import './RatingHeader.css';
import RatingFormCard from '../RatingFormCard/RatingFormCard'
import Popup from 'reactjs-popup'
const RatingHeader = (props) => {
    return <div className='rating-header'>
        <div className='rate'>
            <p className='subtitle'>Comments and ratings: &nbsp;</p>
            <p className='subtitle'>{props.overallRatingScore}</p>   
        </div>
        <div className="subtitle" id="overall-rating">placeholder</div>
        {props.canRate
        ? <Button className="add-comment" onClick={props.toggleFormCard}>
            {props.isRated
            ? "Edit your comment"
            : "Add a new comment"
        }
            </Button>
    : null
    }
        

        
    </div>
}

export default RatingHeader