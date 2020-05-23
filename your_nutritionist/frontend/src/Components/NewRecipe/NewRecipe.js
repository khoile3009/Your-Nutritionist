import React from 'react';
import { Container, Row, Col, Form, FormGroup, Button, FormFile } from 'react-bootstrap';
import './NewRecipe.css';
import { IngredientFormSection, StepFormSection, ImageForm } from './FormSections/FormSections';

const NewRecipe = (props) => {
    return <Container className='shadow custom-container' fluid='sm' >
        <Row>
            <Col>
                <p className='title text-center' > Create New Recipe </p>
            </Col>
        </Row>
        <Form>
            <Form.Group >
                <Form.Label><p className='bold'>Recipe Name</p></Form.Label>
                <Form.Control type="text" placeholder="Recipe Name" name="name" onChange={props.handleChangeSameName} value={props.name} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group >
                        <Form.Label><p className='bold'>Number of serving</p></Form.Label>
                        <Form.Control type="number" placeholder="E.g. 1 person" name="number_person" onChange={props.handleChangeSameName} value={props.number_person} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                        <Form.Label><p className='bold'>Prep Time (mins)</p></Form.Label>
                        <Form.Control type="number" placeholder="E.g. 1" name="prep_time" onChange={props.handleChangeSameName} value={props.prep_time} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label><p className='bold'>Cook Time (mins)</p></Form.Label>
                        <Form.Control type="number" placeholder="E.g. 1" name="cook_time" onChange={props.handleChangeSameName} value={props.cook_time} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Form.Label><p className='bold'>Description</p></Form.Label>
                <Form.Control as="textarea" placeholder="Your description goes here" name="description" value={props.description} onChange={props.handleChangeSameName} rows="3" />
            </Form.Group>

            <hr></hr>

            <Form.Label><p className='bold'>Ingredients</p></Form.Label>
            {props.ingredient_sections.map((ingredient_section, index) => {
                return <IngredientFormSection 
                addIngredient={props.addIngredient}
                section_index={index} 
                ingredient_section={ingredient_section}
                deleteIngredient = {props.deleteIngredient}
                deleteIngredientSection = {props.deleteIngredientSection}
                handleChangeIngredientSectionName = {props.handleChangeIngredientSectionName}
                handleChangeIngredient = {props.handleChangeIngredient}
            ></IngredientFormSection>
            })}
            <Button variant="light" className=" center" onClick={props.addIngredientSection}> Add section </Button>

            <hr></hr>

            <Form.Label><p className='bold'>Steps</p></Form.Label>
            {props.step_sections.map((step_section, index) => {
                return <StepFormSection 
                addStep={props.addStep}
                section_index={index} 
                step_section={step_section}
                deleteStep = {props.deleteStep}
                deleteStepSection = {props.deleteStepSection}
                handleChangeStepSectionName = {props.handleChangeStepSectionName}
                handleChangeStep = {props.handleChangeStep}
            ></StepFormSection>
            })}
            <Button variant="light" className=" center" onClick={props.addStepSection}> Add section </Button>

            <hr></hr>

            <Form.Group>
                <Form.Label><p className='bold'>Images</p></Form.Label>
                {props.images.map((image,index) => {
                    return <ImageForm 
                    onChangeImage={(event) => {props.onChangeImage(event,index)}}
                    deleteImage={() => {props.deleteImage(index)}}
                    label={
                        image === undefined?
                        'Choose an image':
                        image.name
                    }
                ></ImageForm>;
                })}
            </Form.Group>
            <Button variant="outline-dark" className="circle-button center" onClick={props.addImage}> + </Button>

            <hr></hr>

            <Button onClick={props.submitForm}>Create</Button>
            <Button variant='light' >Cancel</Button>
            
        </Form>





    </Container>
}

export default NewRecipe;