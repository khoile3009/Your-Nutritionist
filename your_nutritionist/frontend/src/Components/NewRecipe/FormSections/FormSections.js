import React from 'react';
import { Form, FormGroup, Col, Row, Button } from 'react-bootstrap'


const IngredientFormSection = (props) => {
    return <FormGroup>
        <Row>
            <Col xs='2'><p>Section name: </p></Col>
            <Col xs='9'><Form.Control type='text' placeholder='Leave blank if main section' value={props.ingredient_section.name} onChange={(event) => {props.handleChangeIngredientSectionName(props.section_index,event)}}></Form.Control></Col>
            <Col xs='1'><Button variant='secondary' onClick={() => {props.deleteIngredientSection(props.section_index)}}>x</Button></Col>
        </Row>
        <div className="outline-formgroup" >
            {props.ingredient_section.ingredients.map((ingredient, index) => {
                return <IngredientForm
                deleteIngredient={() => {props.deleteIngredient(props.section_index, index)}}
                handleChangeIngredient = {(event) => {props.handleChangeIngredient(props.section_index, index, event)}}
                ingredient = {ingredient}
                ></IngredientForm>
            })}
            <Button variant="outline-dark" className="circle-button center" onClick={() => {props.addIngredient(props.section_index)}}> + </Button>
        </div>
    </FormGroup>
}

const StepFormSection = (props) => {
    return <FormGroup>
        <Row>
            <Col xs='2'><p>Section name: </p></Col>
            <Col xs='9'><Form.Control type='text' placeholder='Leave blank if main section' value={props.step_section.name} onChange={(event) => {props.handleChangeStepSectionName(props.section_index,event)}}></Form.Control></Col>
            <Col xs='1'><Button variant='secondary' onClick={() => {props.deleteStepSection(props.section_index)}}>x</Button></Col>
        </Row>
        <div className="outline-formgroup" >
            {props.step_section.steps.map((step, index) => {
                return <StepForm
                deleteStep={() => {props.deleteStep(props.section_index, index)}}
                handleChangeStep = {(event) => {props.handleChangeStep(props.section_index, index, event)}}
                step = {step}
                ></StepForm>
            })}
            <Button variant="outline-dark" className="circle-button center" onClick={() => {props.addStep(props.section_index)}}> + </Button>
        </div>
    </FormGroup>
}

const IngredientForm = (props) => {
    return <div className='flexbox'>
        <Form.Control type="text" placeholder="Ingredient" name="step" value={props.ingredient} onChange={props.handleChangeIngredient}/>
        <Button variant='secondary' onClick={props.deleteIngredient} >x</Button>
    </div>
}

const StepForm = (props) => {
    return <div className='flexbox'>
        <Form.Control type="text" placeholder="Step" name="step" value={props.step} onChange={props.handleChangeStep} as='textarea' row='3'/>
        <Button variant='secondary' onClick={props.deleteStep} >x</Button>

    </div>
}

const ImageForm = (props) => {
    return <div className='flexbox'>
        <Form.File name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange={props.onChangeImage} label={props.label} custom/>
        <Button variant='secondary' onClick={props.deleteImage} >x</Button>
    </div>
}


export { IngredientFormSection }
export { StepFormSection }
export { ImageForm}