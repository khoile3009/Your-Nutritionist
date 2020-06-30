import React from "react";
import { Form, FormGroup, Col, Row, Button } from "react-bootstrap";
import "./FormSections.css";

const IngredientFormSection = (props) => {
	return (
		<FormGroup>
			<Row>
				<Col xs="11">
					<Form.Control
						type="text"
						placeholder="Section Name (Leave blank if main section)"
						value={props.ingredient_section.name}
						onChange={(event) => {
							props.handleChangeIngredientSectionName(props.section_index, event);
						}}
					></Form.Control>
				</Col>
				<Col xs="1">
					<Button
						variant="secondary"
						onClick={() => {
							props.deleteIngredientSection(props.section_index);
						}}
					>
						X
					</Button>
				</Col>
			</Row>
			<div className="outline-formgroup">
				{props.ingredient_section.ingredients.map((ingredient, index) => {
					return (
						<IngredientForm
							deleteIngredient={() => {
								props.deleteIngredient(props.section_index, index);
							}}
							ingredient={ingredient}
							units={props.units}
							handleChangeIngredient={(event) => {
								props.handleChangeIngredient(props.section_index, index, event);
							}}
						></IngredientForm>
					);
				})}
				<Button
					variant="outline-dark"
					className="circle-button center"
					onClick={() => {
						props.addIngredient(props.section_index);
					}}
				>
					{" "}
					+{" "}
				</Button>
			</div>
		</FormGroup>
	);
};

const StepFormSection = (props) => {
	return (
		<FormGroup>
			<Row>
				<Col xs="11">
					<Form.Control
						type="text"
						placeholder="Section Name (Leave blank if main section)"
						value={props.step_section.name}
						onChange={(event) => {
							props.handleChangeStepSectionName(props.section_index, event);
						}}
					></Form.Control>
				</Col>
				<Col xs="1">
					<Button
						variant="secondary"
						onClick={() => {
							props.deleteStepSection(props.section_index);
						}}
					>
						X
					</Button>
				</Col>
			</Row>
			<div className="outline-formgroup">
				{props.step_section.steps.map((step, index) => {
					return (
						<StepForm
							deleteStep={() => {
								props.deleteStep(props.section_index, index);
							}}
							handleChangeStepDirection={(event) => {
								props.handleChangeStepDirection(props.section_index, index, event);
							}}
							handleChangeStepTimestamp={(event) => {
								props.handleChangeStepTimestamp(props.section_index, index, event);
							}}
							handleChangeStepMediaId={(event) => {
								props.handleChangeStepMediaId(props.section_index, index, event);
							}}
							step={step}
							videoOptions={props.videoOptions}
						></StepForm>
					);
				})}
				<Button
					variant="outline-dark"
					className="circle-button center"
					onClick={() => {
						props.addStep(props.section_index);
					}}
				>
					{" "}
					+{" "}
				</Button>
			</div>
		</FormGroup>
	);
};

const IngredientForm = (props) => {
	return (
		<div className="flexbox">
			<Form.Control type="text" placeholder="Ingredient" name="name" value={props.ingredient} onChange={props.handleChangeIngredient} />
			<Button variant="secondary" onClick={props.deleteIngredient}>
				X
			</Button>
		</div>
	);
};

const StepForm = (props) => {
	return (
		<div className="flexbox">
			<Form.Control type="number" className="timestamp-input" placeholder="second" name="timestamp" value={props.step.timestamp} onChange={props.handleChangeStepTimestamp}></Form.Control>
			<Form.Control as="select" className="mediaId-input" value={props.step.mediaId} onChange={props.handleChangeStepMediaId}>
				<option value="-1">Choose video...</option>
				{props.videoOptions
					? props.videoOptions.map((videoOption) => {
							return <option value={videoOption.index}>{videoOption.name}</option>;
					  })
					: null}
			</Form.Control>
			<Form.Control style={{ height: 38 }} type="text" placeholder="Step" name="step" value={props.step.direction} onChange={props.handleChangeStepDirection} as="textarea" rows="1" />
			<Button variant="secondary" onClick={props.deleteStep}>
				X
			</Button>
		</div>
	);
};

const ImageForm = (props) => {
	return (
		<div className="flexbox">
			<Form.Control style={{ fontSize: 10, height: 38 }} className="media-input" as="select" onChange={props.handleChangeMediaType} value={props.media.type}>
				<option value={0}>Image URL</option>
				<option value={1}>Image Upload</option>
				<option value={2}>Youtube URL</option>
				<option value={3}>Video Upload</option>
			</Form.Control>
			<Form.Control className="name-input" type="text" placeholder="Title" name="name" value={props.media.name} onChange={props.handleChangeMediaName} />
			{props.media.type == 0 || props.media.type == 2 ? <Form.Control name="url" placeholder="URL" value={props.media.url} onChange={props.handleChangeMediaUrl} /> : <Form.File name="myImage" accept={props.media.type == 1 ? "image/x-png,image/gif,image/jpeg" : "video/mp4,video/m4v"} onChange={props.handleChangeMediaFile} label={<p style={{ overflowX: "hidden" }}>{props.media.label}</p>} custom />}

			<Button variant="secondary" onClick={props.deleteMedia}>
				X
			</Button>
		</div>
	);
};

export { IngredientFormSection };
export { ImageForm };
export { StepFormSection };
