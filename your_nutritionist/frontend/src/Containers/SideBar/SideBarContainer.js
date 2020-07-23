import React, { Component } from "react";
import SideBar from "../../Components/Util/SideBar/SideBar";
import { withRouter } from "react-router-dom"

class SideBarContainer extends Component {
    constructor(props) {
        super(props);
        this.toCreatePost = this.toCreatePost.bind(this);
        this.toCreateRecipe = this.toCreateRecipe.bind(this);
    }

    toCreateRecipe(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.history.push("/recipe/create");
    }

    toCreatePost(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.history.push("/create/post")
    }

    render() {
        return <SideBar 
            toCreateRecipe={(event) => {
                this.toCreateRecipe(event);
            }}
            toCreatePost={(event) => {
                this.toCreatePost(event);
            }} />
    }
}

export default withRouter(SideBarContainer);
