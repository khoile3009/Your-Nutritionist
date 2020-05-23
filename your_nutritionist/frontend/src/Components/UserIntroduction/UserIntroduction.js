import React from 'react'
import {Row,Col,} from 'react-bootstrap'
const UserIntroduction = (props) => {
    return props.introduction !== ''
    ?
    <>
        <Row>
            <Col>
                <p className='subtitle'>Introduction</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <p className='headline'>{props.introduction}</p>
            </Col>
        </Row>
    </>
    : null
}

export default UserIntroduction;