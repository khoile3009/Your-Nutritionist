import React, { Component } from "react";
import { connect } from 'react-redux'

class DarkMode extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){
        let darkmode = localStorage.getItem('DARKMODE')
        if(darkmode != null){
            document.documentElement.setAttribute(
                "data-theme",
                darkmode == 'false' ? "light" : "dark"
            );
        }
    }

    componentWillReceiveProps(props) {
        console.log(props)
        if (props.darkmode != null) {
            document.documentElement.setAttribute(
                "data-theme",
                props.darkmode == false ? "light" : "dark"
            );
        }
    }

    render(){
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        darkmode: state.UI.darkmode,
    };
};

export default connect(mapStateToProps,()=>{})(DarkMode);
