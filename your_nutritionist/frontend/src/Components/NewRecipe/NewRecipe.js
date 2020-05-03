import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NewRecipe = (props) => {
    return <Container className='shadow custom-container' fluid='sm' >
        <Row>
            <Col>
                <p className='title' > Create New Recipe </p> 
            </Col> 
        </Row> 
    </Container>
}

export default NewRecipe;