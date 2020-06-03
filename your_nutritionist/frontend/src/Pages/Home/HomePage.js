import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SigninRequired from '../../Containers/SigninRequired/SigninRequired'
import NewFeedContainer from '../../Containers/NewFeed/NewFeedContainer'


class HomePage extends Component {
    render(){
        return <>
        <Row><Col><h1>a</h1></Col></Row>
        <Row>
            <Col><SigninRequired content={<NewFeedContainer></NewFeedContainer>}></SigninRequired></Col>
            <Col><SigninRequired content={<NewFeedContainer></NewFeedContainer>}></SigninRequired></Col>
            <Col>
            <SigninRequired content={<NewFeedContainer></NewFeedContainer>}></SigninRequired>
            </Col>
        </Row>
        </>
    }
}
export default HomePage;