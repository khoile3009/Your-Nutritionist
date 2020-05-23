import React from 'react';
import './ActionCard.css';

const ActionCard = (props) => {
    console.log(props)
    return <div
        className='card action-card clickable'
        style={{ backgroundImage: "url('" + props.image_url + "')" }}
    >

            <div className="action-description">
                
                <p>
                    <a href='google.com'>{props.from_name}</a>
                    {' ' +props.description + ' '}
                    <a href='google.com'>{props.from_name}</a>
                </p>
            </div>

    </div>
}

export default ActionCard