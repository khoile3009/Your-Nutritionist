import React, { Component } from "react";
import { Form, FormControl, InputGroup, Button, Modal } from "react-bootstrap";
import "./RecipeSearchbox.scss";
import { withRouter } from "react-router-dom";
import axios from "../../../axios-orders";
import queryString from "query-string";

class RecipeSearchbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: null,
			showModal: false,
			searchQuery: "",
			page: 1,
			chk: {
				searchQueryChk: null,
			},
		};
		this.hideModal = this.hideModal.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleChangeSearchQuery = this.handleChangeSearchQuery.bind(this);
		this.search = this.search.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
		this.toPage = this.toPage.bind(this);
		// input validations
		this.validateSearchQuery = this.validateSearchQuery.bind(this);
	}

	componentDidMount = () => {
		console.log(this.state.page);
		if (this.props.location.search) {
			let params = queryString.parse(this.props.location.search);
			let query = params.query;
			axios
				.get("api/recipe", {
					params: {
						query: query,
						block: Math.floor(parseInt(params.page - 1) / 5),
					},
				})
				.then((response) => {
					this.setState({
						recipes: response.data.recipes,
						searchQuery: query,
						page: parseInt(params.page),
					});
				});
			this.setState({});
		}
		this.num_preload = 5;
	};

	componentWillReceiveProps(props) {
		let next_params = queryString.parse(props.location.search);
		let next_page = parseInt(next_params.page);
		if (
			Math.floor((next_page - 1) / this.num_preload) !==
			Math.floor((this.state.page - 1) / this.num_preload)
		) {
			axios
				.get("api/recipe", {
					params: {
						query: next_params.query,
						block: Math.floor((next_page - 1) / this.num_preload),
					},
				})
				.then((response) => {
					this.setState({
						recipes: response.data.recipes,
						searchQuery: next_params.query,
						page: next_page,
					});
				});
		} else {
			this.setState({
				page: next_page,
			});
		}
	}

	hideModal = () => {
		this.setState({ showModal: false });
	};

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	handleChangeSearchQuery = (event) => {
		this.setState({ searchQuery: event.target.value });
	};

	search = () => {
		this.props.history.push({
			pathname: "/search",
			search: queryString.stringify({ query: this.state.searchQuery, page: 1 }),
		});
	};

	toPage = (page) => {
		console.log(page);
		this.props.history.push({
			pathname: "/search",
			search: queryString.stringify({
				query: queryString.parse(this.props.location.search).query,
				page: page,
			}),
		});
	};

	// input validations
	validateSearchQuery = () => {
		console.log(this.state);
		return this.state.searchQuery !== "";
	};

	searchHandler = (event) => {
		console.log("search handler passed");
		event.preventDefault();
		this.updateErrorStateWithCallback(this.search);
	};

	isErrorFree = () => {
		console.log("is error free passed");
		return this.state.chk.searchQueryChk;
	};

	updateErrorStateWithCallback = (callback) => {
		console.log("update error state passed");
		this.setState(
			{
				chk: {
					searchQueryChk: this.validateSearchQuery(),
				},
			},
			() => {
				if (this.isErrorFree()) {
					callback();
				}
			}
		);
	};

	render() {
		return (
			<div className="searchbox-container">
				<InputGroup className="searchbox">
					{/* <InputGroup.Prepend>
                    <Popup
                    trigger={<Button variant="outline-secondary">Button</Button>}
                    position='bottom center'
                    on='hover'
                    >
                        <SearchHelp></SearchHelp>
                    </Popup>
                </InputGroup.Prepend>    */}
					<FormControl
						placeholder="Search recipes or users"
						className="search-txt"
						aria-describedby="basic-addon1"
						value={this.searchQuery}
						onChange={this.handleChangeSearchQuery}
						chk={this.state.chk}
					/>

					<InputGroup.Append>
						<Button
							className="search-button"
							variant="secondary"
							onClick={this.searchHandler}
						/>
					</InputGroup.Append>
				</InputGroup>
				{this.state.chk.searchQueryChk === false ? (
					<div className="error">
						<code>Please provide us with some search keywords first!</code>
					</div>
				) : null}
			</div>
		);
	}
}

export default withRouter(RecipeSearchbox);
