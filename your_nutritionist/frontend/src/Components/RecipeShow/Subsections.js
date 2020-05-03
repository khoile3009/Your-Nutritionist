import React from 'react';
import './RecipeShow.css';

const IngredientSections = (props) => {

    return <div>
        <p className='text-left section-name'>Ingredients</p>
        {props.ingredient_sections.map((ingredient_section, index) => {
            return <div>
                <SubsectionName name={ingredient_section.name}></SubsectionName>
                <ul>
                    {ingredient_section.ingredients.map((ingredient, index) => {
                        return <li className='text-left'><p className='items'>{ingredient.amount} {ingredient.measurement} {ingredient.name}</p></li>
                    })}
                </ul>
            </div>
        })}
    </div>
}

const StepsSections = (props) => {
    console.log(props.step_sections)
    return <div>
        <p className='text-left section-name'>Steps</p>
        {props.step_sections.map((step_section, index) => {
            return <div><SubsectionName name={step_section.name}></SubsectionName>
                <ol>
                    {step_section.steps.map((step,index) => {
                        return <li className='text-left'><p className='items'>{step.direction}</p></li>
                    })}
                </ol>
            </div>
        })}
    </div>
}


const SubsectionName = (props) => {
    return props.name != 'Main' ?
        <p className='subsection-name text-left'>{props.name}</p> :
        null
}


export { IngredientSections };
export { StepsSections };