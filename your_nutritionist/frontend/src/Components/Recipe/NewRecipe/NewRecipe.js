import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./NewRecipe.scss";
import { IngredientFormSection, StepFormSection, ImageForm } from "./FormSections/FormSections";

const NewRecipe = (props) => {
	console.log(props.medias);
	return (
		<>
			<Row>
				<Col>
					<p className="create-recipe-title text-center"> Create New Recipe </p>
				</Col>
			</Row>
			<Form>
				<Form.Group>
					<Form.Label>
						<p className="bold">Recipe Name</p>
					</Form.Label>
					<Form.Control
						type="text"
						placeholder="Recipe Name"
						name="name"
						onChange={props.handleChangeSameName}
						value={props.name}
					/>
				</Form.Group>
				<Row>
					<Col>
						<Form.Label>
							<p className="bold">Number of serving</p>
						</Form.Label>
					</Col>
					<Col>
						<Form.Label>
							<p className="bold">Prep Time (mins)</p>
						</Form.Label>
					</Col>
					<Col>
						<Form.Label>
							<p className="bold">Cook Time (mins)</p>
						</Form.Label>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Control
							type="number"
							placeholder="E.g. 1 person"
							name="number_person"
							onChange={props.handleChangeSameName}
							value={props.number_person}
						/>
					</Col>
					<Col>
						<Form.Control
							type="number"
							placeholder="E.g. 1"
							name="prep_time"
							onChange={props.handleChangeSameName}
							value={props.prep_time}
						/>
					</Col>
					<Col>
						<Form.Control
							type="number"
							placeholder="E.g. 1"
							name="cook_time"
							onChange={props.handleChangeSameName}
							value={props.cook_time}
						/>
					</Col>
				</Row>
				<br></br>
				{/* <Row>
					<Col>
						<Form.Group>
							<Form.Label>
								<p className="bold">Number of serving</p>
							</Form.Label>
							<Form.Control type="number" placeholder="E.g. 1 person" name="number_person" onChange={props.handleChangeSameName} value={props.number_person} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>
								<p className="bold">Prep Time (mins)</p>
							</Form.Label>
							<Form.Control type="number" placeholder="E.g. 1" name="prep_time" onChange={props.handleChangeSameName} value={props.prep_time} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>
								<p className="bold">Cook Time (mins)</p>
							</Form.Label>
							<Form.Control type="number" placeholder="E.g. 1" name="cook_time" onChange={props.handleChangeSameName} value={props.cook_time} />
						</Form.Group>
					</Col>
				</Row> */}
				<Row>
					<Form.Group>
						<Form.Label>
							<p className="bold">Description</p>
						</Form.Label>
					</Form.Group>
				</Row>
				<Row>
					<Form.Control
						style={{ padding: "1rem" }}
						as="textarea"
						placeholder="Your description goes here"
						name="description"
						value={props.description}
						onChange={props.handleChangeSameName}
						rows="2"
					/>
				</Row>

				<hr></hr>

				<Form.Group>
					<Form.Label>
						<p className="bold">Images and Videos</p>
					</Form.Label>
					{props.medias.map((media, index) => {
						return (
							<ImageForm
								onChangeImage={(event) => {
									props.onChangeImage(event, index);
								}}
								deleteMedia={() => {
									props.deleteMedia(index);
								}}
								handleChangeMediaType={(event) => {
									props.handleChangeMediaType(event, index);
								}}
								handleChangeMediaUrl={(event) => {
									props.handleChangeMediaUrl(event, index);
								}}
								handleChangeMediaName={(event) => {
									props.handleChangeMediaName(event, index);
								}}
								handleChangeMediaFile={(event) => {
									props.handleChangeMediaFile(event, index);
								}}
								media={media}
							></ImageForm>
						);
					})}
				</Form.Group>
				<Button
					variant="outline-dark"
					className="circle-button center"
					onClick={props.addMedia}
				>
					{" "}
					+{" "}
				</Button>

				<hr></hr>

				<Form.Label>
					<p className="bold">Ingredients</p>
				</Form.Label>
				{props.ingredient_sections.map((ingredient_section, index) => {
					return (
						<IngredientFormSection
							units={props.units}
							addIngredient={props.addIngredient}
							section_index={index}
							ingredient_section={ingredient_section}
							handleChangeIngredient={props.handleChangeIngredient}
							deleteIngredient={props.deleteIngredient}
							deleteIngredientSection={props.deleteIngredientSection}
							handleChangeIngredientSectionName={
								props.handleChangeIngredientSectionName
							}
						></IngredientFormSection>
					);
				})}
				<Button variant="light" className=" center" onClick={props.addIngredientSection}>
					{" "}
					Add section{" "}
				</Button>

				<hr></hr>

				<Form.Label>
					<p className="bold">Steps</p>
				</Form.Label>
				{props.step_sections.map((step_section, index) => {
					return (
						<StepFormSection
							addStep={props.addStep}
							section_index={index}
							step_section={step_section}
							deleteStep={props.deleteStep}
							deleteStepSection={props.deleteStepSection}
							handleChangeStepSectionName={props.handleChangeStepSectionName}
							handleChangeStepMediaId={props.handleChangeStepMediaId}
							handleChangeStepTimestamp={props.handleChangeStepTimestamp}
							handleChangeStepDirection={props.handleChangeStepDirection}
							imageNames={props.imageNames}
							videoOptions={props.medias
								.map((media, index) => {
									console.log(media);
									if (media.type == 2 || media.type == 3) {
										return {
											index: index,
											name: media.name,
										};
									}
								})
								.filter((media) => media)}
						></StepFormSection>
					);
				})}
				<Button variant="light" className=" center" onClick={props.addStepSection}>
					{" "}
					Add section{" "}
				</Button>

				<hr></hr>
				<Row className="submitCancelBtn">
					<Col></Col>
					<Col className="target">
						<Button
							className="createRecipeBtn custom-btn-primary"
							onClick={props.submitForm}
						>
							Create
						</Button>
						<Button className="cancelRecipeBtn custom-btn-cancel" href="/home">
							Cancel
						</Button>
					</Col>
					<Col></Col>
				</Row>
			</Form>
		</>
	);
};

export default NewRecipe;
