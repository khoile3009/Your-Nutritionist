import React, { Component } from "react";
import SideBar from "../../Components/Util/SideBar/SideBar";

class SideBarContainer extends Component {
    constructor(props) {
        super(props);
        this.toCreatePost = this.toCreatePost.bind(this);
        this.toCreateRecipe = this.toCreateRecipe.bind(this);
    }

    toCreateRecipe(event) {
        event.preventDefault();
        this.props.history.push("/recipe/create");
    }

    toCreatePost(event) {
        event.preventDefault();
    }

    render() {
        return <SideBar></SideBar>;
    }
}

export default SideBarContainer;
