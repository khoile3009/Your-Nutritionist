import React from 'react';
import { Button } from 'react-bootstrap'
import './RatingHeader.css';
import RatingFormCard from '../RatingFormCard/RatingFormCard'
import Popup from 'reactjs-popup'
const RatingHeader = (props) => {
    return <div className='rating-header'>
        <div className='rate'>
            <p className='subtitle'>Rating: </p>
            <p className='subtitle'>4.5</p>
        </div>
        {props.canRate
        ? <Button onClick={props.toggleFormCard}>
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