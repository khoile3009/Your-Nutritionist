import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import './UserInfo.css'

const UserInfo = (props) => {
    console.log(props)
    return <>
        <Row>
            <Col>
                <div className='user-head'>
                    <div 
                        className='profile-pic shadow '
                        style={{backgroundImage:"url('" + props.user_info.profilepic+"')"}}
                    >
                        {props.logged_in && props.isSelf 
                        ? <div className="editable" onClick={props.showProfileEditForm}>
                        </div>
                        :null
                        }   
                    </div>
                    <div className='user-info'>
                        <div>
                            <p className='title'>{props.user_info.name}</p>
                            <p className='subtitle'>@{props.user_info.username}</p>
                            <p className='headline'>{props.user_info.headline}</p>
                            {console.log(props.isSelf)}
                            {props.logged_in && props.isSelf ? (<Button onClick={props.showEditHeadline} className="edit-headline-btn">🖉</Button>) : null}
                            {console.log(props.user_info)}
                            {(props.logged_in &&!props.isSelf)
                                ?
                                props.following == false
                                    ? <Button onClick={props.follow}>Follow</Button>
                                    : <Button onClick={props.unfollow}>Following</Button>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </Col>

        </Row >
        




    </>



}

export default UserInfo;