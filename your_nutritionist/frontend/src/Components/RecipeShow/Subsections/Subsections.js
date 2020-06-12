import React from 'react';
import '../RecipeShow.css';

const IngredientSections = (props) => {

    return <div>
        <p className='text-left section-name'>Ingredients</p>
        {props.ingredient_sections.map((ingredient_section, index) => {
            return <div>
                <SubsectionName name={ingredient_section.name}></SubsectionName>
                <ul>
                    {ingredient_section.ingredients.map((ingredient, index) => {
                        return <li className='text-left'><p className='items'>{ingredient.amount + ' ' + ingredient.unit + ' of ' + ingredient.name}</p></li>
                    })}
                </ul>
            </div>
        })}
    </div>
}

const StepsSections = (props) => {
    return <div>
        <p className='text-left section-name'>Steps</p>
        {props.step_sections.map((step_section, index) => {
            return <div><SubsectionName name={step_section.name}></SubsectionName>
                <ol>
                    {step_section.steps.map((step,index) => {
                        return <li className='text-left'>
                            <p className='items'>{step.direction}<button onClick={()=>{props.goToSecondOnMedia(step.timestamp,step.mediaId)}}>{'>'}</button></p>
                        </li>
                    })}
                </ol>
            </div>
        })}
    </div>
}


const SubsectionName = (props) => {
    return props.name !== '' ?
        <p className='subsection-name text-left'>{props.name}</p> :
        null
}


export { IngredientSections };
export { StepsSections };