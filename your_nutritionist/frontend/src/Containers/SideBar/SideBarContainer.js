import React, { Component } from "react";
import SideBar from "../../Components/Util/SideBar/SideBar";
import { withRouter } from "react-router-dom";
import TrendingCard from "../../Components/Home/TrendingCard/TrendingCard";

class SideBarContainer extends Component {
    constructor(props) {
        super(props);
        this.toCreatePost = this.toCreatePost.bind(this);
        this.toCreateRecipe = this.toCreateRecipe.bind(this);
        this.toTrendingRecipe = this.toTrendingRecipe.bind(this);
    }

    toCreateRecipe(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.history.push("/recipe/create");
    }

    toCreatePost(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.history.push("/create/post");
    }

    toTrendingRecipe(route) {
        this.props.history.push(route);
    }

    render() {
        let fakeTrendingRecipes = [
            {
                recipe_id: 1,
                creator_id: 3,
                recipe_name: "gà rán kfc",
                recipe_favorites: 69,
                recipe_ratings: 5,
                recipe_creation_date: "2020年07月24日",
                trending_rank: 1,
            },
            {
                recipe_id: 2,
                creator_id: 2,
                recipe_name: "really gà rán kfc",
                recipe_favorites: 420,
                recipe_ratings: 4,
                recipe_creation_date: "2020年07月24日",
                trending_rank: 2,
            },
            {
                recipe_id: 3,
                creator_id: 1,
                recipe_name: "not gà rán kfc",
                recipe_favorites: 247,
                recipe_ratings: 3,
                recipe_creation_date: "2020年07月24日",
                trending_rank: 3,
            },
        ];
        return (
            <>
                <SideBar
                    toCreateRecipe={(event) => {
                        this.toCreateRecipe(event);
                    }}
                    toCreatePost={(event) => {
                        this.toCreatePost(event);
                    }}
                />
                # map trending receipes ở dưới này!!
            </>
        );
    }
}

export default withRouter(SideBarContainer);
