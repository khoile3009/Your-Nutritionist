import React from 'react'
import { Row, Col } from 'react-bootstrap'

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
                        </div>
                    </div>
                </div>
            </Col>

        </Row >
        <hr></hr>
        {
            props.user_info.introduction !== ''
                ?
                <>
                    <Row>
                        <Col>
                            <p className='subtitle'>Introduction</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='headline'>{props.user_info.introduction}</p>
                        </Col>
                    </Row>
                    <hr></hr>
                </>
                : null
        }




    </>



}

export default UserInfo;