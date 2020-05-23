import React, { Component } from 'react';

import NewRecipe from '../../Components/NewRecipe/NewRecipe';
import axios from '../../axios-orders';
import SigninRequired from '../SigninRequired/SigninRequired';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
// import {Route} from 'react-router-dom';
class NewRecipeContainer extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
        this.recipe_data_from_form = this.recipe_data_from_form.bind(this)

        this.addIngredientSection = this.addIngredientSection.bind(this)
        this.deleteIngredient = this.deleteIngredient.bind(this)
        this.deleteIngredientSection = this.deleteIngredientSection.bind(this)
        this.addIngredient = this.addIngredient.bind(this)
        this.handleChangeIngredientSectionName = this.handleChangeIngredientSectionName.bind(this)
        this.handleChangeSameName = this.handleChangeSameName.bind(this)
        this.handleChangeIngredient = this.handleChangeIngredient.bind(this)

        this.addStepSection = this.addStepSection.bind(this)
        this.deleteStep = this.deleteStep.bind(this)
        this.deleteStepSection = this.deleteStepSection.bind(this)
        this.addStep = this.addStep.bind(this)
        this.handleChangeStepSectionName = this.handleChangeStepSectionName.bind(this)
        this.handleChangeSameName = this.handleChangeSameName.bind(this)
        this.handleChangeStep = this.handleChangeStep.bind(this)

        this.onChangeImage = this.onChangeImage.bind(this)
        this.addImage = this.addImage.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.state = {
            name: '',
            description: "",
            number_person: 0,
            prep_time: 0,
            cook_time: 0,
            ingredient_sections: [
                {
                    name: '',
                    ingredients: [
                        ''
                    ]
                }
            ],
            step_sections: [
                {
                    name: '',
                    steps: [
                        ''
                    ]
                }
            ],
            images: []
        }
    }

    handleChangeSameName = (event) => {
        this.setState({ [event.target.name]: event.target.value })

    }

    // Submit 
    submitForm = () => {
        let data = this.recipe_data_from_form()
        axios.post('api/recipe/create', data,{headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': 'Token ' + this.props.token
            }
        })
        .then((response) => {
            this.props.history.push('/recipe/' + response.data.recipe_id)
        })
    }

    recipe_data_from_form = () => {
        let data = new FormData()
        data.append('recipe',  JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            number_person: parseInt(this.state.number_person),
            prep_time: parseInt(this.state.prep_time),
            cook_time: parseInt(this.state.cook_time),
            ingredient_sections: this.state.ingredient_sections,
            step_sections: this.state.step_sections,
        }))
        data = this.add_images_to_form_data(data, this.state.images)
        return data
    }

    add_images_to_form_data(data, images){
        for(var image_index = 0; image_index < images.length; image_index++){
            data.append('image_' + image_index, images[image_index])
        }
        return data
    }

    // Ingredients
    addIngredientSection = () => {
        let tmp = this.state.ingredient_sections
        tmp.push(
            {
                name: '',
                ingredients: [
                    ''
                ]
            }
        )
        this.setState({ ingredient_sections: tmp })
    }

    handleChangeIngredientSectionName = (section_index, event) => {
        let tmp = this.state.ingredient_sections
        tmp[section_index].name = event.target.value
        this.setState({ ingredient_sections: tmp })
    }

    handleChangeIngredient = (section_index, ingredient_index, event) => {
        let tmp = this.state.ingredient_sections
        tmp[section_index].ingredients[ingredient_index] = event.target.value
        this.setState({ ingredient_sections: tmp })
    }

    deleteIngredientSection = (section_index) => {
        let tmp = this.state.ingredient_sections
        this.setState({ ingredient_sections: this.removeElementAtIndex(tmp, section_index) })
    }

    addIngredient = (section_index) => {
        let tmp = this.state.ingredient_sections
        tmp[section_index].ingredients.push(
            ''
        )
        this.setState({ ingredient_sections: tmp })
    }

    deleteIngredient = (section_index, ingredient_index) => {
        let tmp = this.state.ingredient_sections
        tmp[section_index].ingredients = this.removeElementAtIndex(tmp[section_index].ingredients, ingredient_index)
        this.setState({ ingredient_sections: tmp })
    }

    // Steps

    addStepSection = () => {
        let tmp = this.state.step_sections
        tmp.push(
            {
                name: '',
                steps: [
                    ''
                ]
            }
        )
        this.setState({ step_sections: tmp })
    }

    handleChangeStepSectionName = (section_index, event) => {
        let tmp = this.state.step_sections
        tmp[section_index].name = event.target.value
        this.setState({ step_sections: tmp })
    }

    handleChangeStep = (section_index, step_index, event) => {
        let tmp = this.state.step_sections
        tmp[section_index].steps[step_index] = event.target.value
        this.setState({ step_sections: tmp })
    }

    deleteStepSection = (section_index) => {
        let tmp = this.state.step_sections
        this.setState({ step_sections: this.removeElementAtIndex(tmp, section_index) })
    }

    addStep = (section_index) => {
        let tmp = this.state.step_sections
        tmp[section_index].steps.push(
            ''
        )
        this.setState({ step_sections: tmp })
    }

    deleteStep = (section_index, step_index) => {
        let tmp = this.state.step_sections
        tmp[section_index].steps = this.removeElementAtIndex(tmp[section_index].steps, step_index)
        this.setState({ step_sections: tmp })
    }

    removeElementAtIndex = (arr, index) => {
        return arr.slice(0, index).concat(arr.slice(index + 1, arr.length))
    }

    //Image handler 
    onChangeImage = (event, index) => {
        let tmp = this.state.images
        tmp[index] = event.target.files[0]
        this.setState({images: tmp})
    }
    
    addImage = () => {
        let tmp = this.state.images
        tmp.push(undefined)
        this.setState({images:tmp})
        console.log(this.state)
    }

    deleteImage = (image_index) =>{
        let tmp = this.state.images;
        tmp = this.removeElementAtIndex(tmp, image_index)
        this.setState({images: tmp})
    }

    


    render() {
        return <SigninRequired content={<NewRecipe
            handleChangeSameName={this.handleChangeSameName}
            submitForm={this.submitForm}

            addIngredientSection={this.addIngredientSection}
            addIngredient={this.addIngredient}
            deleteIngredient={this.deleteIngredient}
            deleteIngredientSection={this.deleteIngredientSection}
            handleChangeIngredientSectionName={this.handleChangeIngredientSectionName}
            handleChangeIngredient={this.handleChangeIngredient}

            addStepSection={this.addStepSection}
            addStep={this.addStep}
            deleteStep={this.deleteStep}
            deleteStepSection={this.deleteStepSection}
            handleChangeStepSectionName={this.handleChangeStepSectionName}
            handleChangeStep={this.handleChangeStep}

            name={this.state.name}
            description={this.state.description}
            number_person={this.state.number_person}
            prep_time={this.state.prep_time}
            cook_time={this.state.cook_time}
            ingredient_sections={this.state.ingredient_sections}
            step_sections={this.state.step_sections}
            images={this.state.images}

            onChangeImage = {this.onChangeImage}
            addImage = {this.addImage}
            deleteImage = {this.deleteImage}
        ></NewRecipe>}></SigninRequired>
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps,() => {})(withRouter(NewRecipeContainer));