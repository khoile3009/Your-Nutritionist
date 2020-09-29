import React, { Component } from "react";
import Header from "../../../Components/Util/Header/Header";
import ModalContainer from "../../Util/Authentication/ModalContainer";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { UserNav, AuthenticationNav } from "../../../Components/Util/Header/RightNav";

class HeaderContainer extends Component {

    constructor(props) {
        super(props);
        this.toHomePage = this.toHomePage.bind(this);
        this.toUserPage = this.toUserPage.bind(this);
        this.showRegisterModal = this.showRegisterModal.bind(this);
        this.showSigninModal = this.showSigninModal.bind(this);
        this.toCreateRecipe = this.toCreateRecipe.bind(this);
        this.onChangeSearchBar = this.onChangeSearchBar.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.state = {
            search_input: "",
        };
        // this.state = {
        //     modalShow: false,
        //     modalType: 1
        // }
        // this.showSigninForm = this.showSigninForm.bind(this)
        // this.showRegisterForm = this.showRegisterForm.bind(this)
        // this.hideModal = this.hideModal.bind(this)
    }

    // showSigninForm = (event) => {
    //     event.preventDefault()
    //     this.setState({
    //         modalShow: true,
    //         modalType: 1
    //     })
    // }

    // showRegisterForm = (event) => {
    //     event.preventDefault()
    //     this.setState({
    //         modalShow: true,
    //         modalType: 2
    //     })
    // }

    // showForgetPasswordForm = () => {
    //     this.setState({
    //         modalShow: true,
    //         modalType: 3
    //     })
    // }

    // hideModal = () => {
    //     this.setState({ modalShow: false })
    // }

    componentDidMount() {
        if (this.props.token) this.props.retrieveUserFromToken(this.props.token);
    }

    getTokenFromLocalStorage = () => {
        return localStorage.getItem("TOKEN");
    };

    toUserPage = (event) => {
        event.preventDefault();
        this.props.history.push("/user/" + this.props.userId);
    };

    toHomePage = (event) => {
        event.preventDefault();
        this.props.history.push("/home");
    };

    showSigninModal = (event) => {
        event.preventDefault();
        this.props.showSigninModal();
    };

    showRegisterModal = (event) => {
        event.preventDefault();
        this.props.showRegisterModal();
    };

    toCreateRecipe = (event) => {
        event.preventDefault();
        this.props.history.push("/recipe/create");
    };

    onChangeSearchBar = (event) => {
        this.setState({ search_input: event.target.value });
    };

    searchSubmit = (event) => {
        event.preventDefault();
        this.props.history.push({
            pathname: "/search",
            search: queryString.stringify({ query: this.state.search_input, page: 1 }),
        });
    };

    refresh = () => {
        this.props.history.push("/temp");
        this.props.history.goBack();
    };

	render() {
		return (
			<>
				<Header
					showSigninModal={this.props.showSigninModal}
					showRegisterModal={this.props.showRegisterModal}
					toCreateRecipe={this.toCreateRecipe}
					toHomePage={this.toHomePage}
					rightNav={
						this.props.token === null ? (
							<AuthenticationNav
								showSigninModal={this.props.showSigninModal}
								showRegisterModal={this.props.showRegisterModal}
							></AuthenticationNav>
						) : (
							<UserNav
								fullname={this.props.fullname}
								toUserPage={this.toUserPage}
								signout={() => {
									this.props.signout(this.props.token);
								}}
							></UserNav>
						)
					}
					search_input={this.state.search_input}
					onChangeSearchBar={this.onChangeSearchBar}
					searchSubmit={this.searchSubmit}
				></Header>
				<ModalContainer
				// show={this.state.modalShow}
				// hideModal={this.hideModal}
				// modalType={this.state.modalType}
				// showSigninForm={this.showSigninForm}
				// showRegisterForm={this.showRegisterForm}
				></ModalContainer>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.auth.username,
		fullname: state.auth.fullname,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        showRegisterModal: (event) => dispatch(actions.showRegisterModal(event)),
        showSigninModal: (event) => dispatch(actions.showSigninModal(event)),
        signout: (token) => dispatch(actions.signout(token)),
        retrieveUserFromToken: (token) => dispatch(actions.retrieveUserFromToken(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderContainer));
