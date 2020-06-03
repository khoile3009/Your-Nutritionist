import React, { Component } from 'react'
import axios from '../../axios-orders';
import UserInfo from '../../Components/UserInfo/UserInfo'
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class UserInfoContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_info: this.props.user_info,
            following: false
        }
        this.checkFollowing = this.checkFollowing.bind(this)
        this.follow = this.follow.bind(this)
        this.unfollow = this.unfollow.bind(this)
    }


    componentDidMount = () => {

        this.checkFollowing()
    }

    
    checkFollowing = () => {
        if (this.props.token) {
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            }
            axios.get('api/user/' + this.props.userId + '/isfollowing', { headers: headers })
                .then(
                    (response) => {
                        console.log(response)
                        this.setState({ following: response.data.following })
                        console.log(this.state)
                    }
                )
                .catch(
                    (err) => {
                    }
                )
        }

    }

    follow = () => {
        if (this.props.token) {
            let data = null
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            }
            let url = 'api/user/' + this.props.userId + '/follow';
            axios.post(url, data, { headers: headers })
                .then(response => {
                    console.log(response)
                    this.setState({ following: true })
                })
                .catch(err => {
                    console.log(err)
                })
            
        }
        else {
            this.props.showSigninRequiredModal()
        }
    }

    unfollow = () => {
        let data = null
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token
        }
        let url = 'api/user/' + this.props.userId + '/follow';
        axios.delete(url, { headers: headers })
            .then(response => {
                console.log(response)
                this.setState({ following: false })
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    render() {
        if (this.state.user_info) {
            return <UserInfo
                user_info={this.state.user_info}
                following={this.state.following}
                follow={this.follow}
                unfollow={this.unfollow}
                isSelf= {this.props.id === this.props.userId}
            ></UserInfo>
        }
        return null
    }

}



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        id : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showSigninRequiredModal: () => dispatch(actions.showSigninRequiredModal()),
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer)