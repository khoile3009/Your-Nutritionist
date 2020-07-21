import React from 'react';
import './StarRating.css';

const StarRating = (props) => {
    console.log(props)
    let widthPixels = (parseFloat(props.rating) * 20).toString() + 'pt';
    return (
        <div className='StarRating'>
            <span className='stars'>
                <span style={{ width: widthPixels }}></span>
            </span>
        </div>
    );
}



export default StarRating;