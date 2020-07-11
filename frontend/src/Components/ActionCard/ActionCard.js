import React from 'react';
import './ActionCard.css';

const ActionCard = (props) => {
    return <div
        className='card action-card clickable'
        style={{ backgroundImage: "url('" + props.image_url + "')" }}
        onClick={props.to_target_page}
    >

            <div className="action-description-container">
                
                <p className="action-description">
                    {props.description}
                </p>
            </div>

    </div>
}

export default ActionCard