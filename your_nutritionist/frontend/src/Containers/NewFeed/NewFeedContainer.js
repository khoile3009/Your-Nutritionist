import React, { Component } from 'react';
import axios from '../../axios-orders'
import ActionList from '../User/ActionList/ActionList'
import { connect } from 'react-redux'
import './NewFeedContainer.css'
import $ from 'jquery';
class NewFeedContainer extends Component {


    constructor(props) {
        super(props)
        this.state = {
            actions: [],
            last_id: -1
        }
        this.loadActions = this.loadActions.bind(this)
        this.reloadActions = this.reloadActions.bind(this)
    }
    componentDidMount() {
        this.loadActions()
        const container = $('.newfeed-container')
        // let scrollable = document.querySelector(".scrollable")
        // scrollable.addEventListener("scroll",function(event){
        //     console.log(event.target)
        //     if(event.target.scrollTop === event.target.scrollTopMax){
        //           console.log("The scroll arrived at bottom")
        //     }
        //   })
        container.on('scroll', () => {
            console.log(container.scrollTop())
            console.log(container.innerHeight())
            console.log(container.scrollHeight)
            if(container.scrollTop() + container.innerHeight() >= container[0].scrollHeight){
                this.loadActions()
            }
        })
        console.log(container)
    }

    loadActions = () => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token
        }
        let params = {
            num: 20,
            before_id: this.state.last_id
        }
        axios.get('api/user/following/action', { headers: headers, params: params })
            .then(
                (response) => {
                    this.setState({
                        actions: this.state.actions.concat(response.data.actions)
                    }, () => {
                        console.log(this.state.actions)
                        if (response.data.actions.length !== 0) {
    
                            this.setState({
                                last_id: response.data.actions[response.data.actions.length - 1].action_id
                            })
                        }
                    }
                    )
                }
            )
    }

    reloadActions = () => {
        this.setState({
            last_id: -1,
            actions: []
        }, this.loadActions)
    }


    render() {
        return <div className='shadow newfeed-container'>
            <button onClick={() => {
                this.loadActions()
            }}>loadActions</button>
            <button onClick={() => {
                this.reloadActions()
            }}>reloadActions</button>
            <ActionList
                actions = {this.state.actions}
            ></ActionList>
            </div>
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(NewFeedContainer)