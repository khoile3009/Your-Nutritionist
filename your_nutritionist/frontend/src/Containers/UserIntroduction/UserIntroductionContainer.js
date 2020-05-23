import React, {Component} from 'react';
import UserIntroduction from '../../Components/UserIntroduction/UserIntroduction';
import axios from '../../axios-orders';
class UserIntroductionContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            introduction: ''
        }
    }

    componentDidMount(){
        axios.get('api/user/2/introduction')
        .then(
            (response) => {
                this.setState({introduction: response.data.introduction})
            }
        )
    }

    render(){
        return <UserIntroduction
            introduction = {this.state.introduction}
        ></UserIntroduction>
    }



}

export default UserIntroductionContainer