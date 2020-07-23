import React from "react";
import "./SideBar.scss";
import { Button } from "react-bootstrap";

const SideBar = (props) => {
    console.log(props);
    return (
        <div className="side-bar-wrapper card">
            <h3>What are you up to?</h3>

            <div className="side-bar-create">
                <div className="create-recipe-btn" onClick={props.toCreateRecipe}>Create a recipe</div>
            </div>
            <div className="side-bar-create">
                <div className="create-post-btn" onClick={props.toCreatePost}>Create a post</div>
            </div>
        </div>
    );
};

export default SideBar;
