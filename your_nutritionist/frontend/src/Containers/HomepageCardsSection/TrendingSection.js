import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import './HomepageCardsSection.css';
import { combineReducers } from 'redux';
import TrendingCard from '../../Components/TrendingCard/TrendingCard';
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap';

class TrendingSection extends Component {

    constructor(props) {
        super(props)
        this.goToRoute = this.goToRoute.bind(this)
    }

    goToRoute = (route) => {
        this.props.history.push(route)
    }

    render() {
        return <>
            <h3>See what's popular</h3>
            <Row>
                <Col md={4}>
                    <TrendingCard
                        url='https://storage.cloud.google.com/your-nutritionist-cdn/null-img-placeholder.png'
                        goToRoute={() => {
                            this.goToRoute('/trending')
                        }}
                        text='trending'
                    />
                </Col>

                <Col md={4}>
                    <TrendingCard
                        url='https://storage.cloud.google.com/your-nutritionist-cdn/null-img-placeholder.png'
                        goToRoute={() => {
                            this.goToRoute('/trending')
                        }}
                        text='trending'
                    />
                </Col>

                <Col md={4}>
                    <TrendingCard
                        url='https://storage.cloud.google.com/your-nutritionist-cdn/null-img-placeholder.png'
                        goToRoute={() => {
                            this.goToRoute('/trending')
                        }}
                        text='trending'
                    />
                </Col>
            </Row>
        </>
    }
}



export default withRouter(TrendingSection);
