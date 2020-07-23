import React from "react";
import "./SideBar.scss";
import { Button } from "react-bootstrap";

const SideBar = (props) => {
    console.log(props);
    return (
        <div className="side-bar-wrapper">
            <h3>What are you up to?</h3>
            <div className="side-bar-create-recipe">
                <div className="create-recipe-btn">Create a recipe</div>
            </div>
            <div className="side-bar-create-post">
                <div className="create-post-btn">Create a post</div>
            </div>
        </div>
    );
};

export default SideBar;
