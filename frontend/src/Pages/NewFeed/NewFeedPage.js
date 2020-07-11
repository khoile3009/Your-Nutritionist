import React, { Component } from 'react';

import NewFeedContainer from '../../Containers/NewFeed/NewFeedContainer';
import SigninRequired from '../../Containers/SigninRequired/SigninRequired';
import { Container } from 'react-bootstrap'
class NewFeedPage extends Component {
    render() {
        return <SigninRequired content={<NewFeedContainer></NewFeedContainer>}></SigninRequired>


    }
}

export default NewFeedPage;