import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import './UserInfo.css'

const UserInfo = (props) => {
    return <>
        <Row>
            <Col>
                <div className='user-head'>
                    <div className='profile-pic shadow'></div>
                    <div className='user-info'>
                        <div>
                            <p className='title'>{props.user_info.name}</p>
                            <p className='subtitle'>@{props.user_info.username} </p>
                            <p className='headline'>{props.user_info.headline}</p>

                            {!props.isSelf
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