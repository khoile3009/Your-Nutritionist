import React, { Component } from 'react';
import ActionCard from '../../Components/ActionCard/ActionCard'
import { Link, withRouter } from 'react-router-dom';

class ActionList extends Component {
    // required props: Get next 20 actions
    constructor(props) {
        super(props);
        this.parse_to_description = this.parse_to_description.bind(this)
        this.to_target_page = this.to_target_page.bind(this)
        this.to_from_page = this.to_from_page.bind(this)
    }

    to_from_page = (event, from_id) => {
        event.preventDefault()
        event.stopPropagation()
        this.props.history.push("/user/" + from_id)
    }

    to_target_page = (event, action_type, target_id) => {
        if(event) event.preventDefault()
        let target_url = ''
        switch (action_type) {
            case 0:
                target_url = "/user/" + target_id
                break
            case 1:
                target_url = "/recipe/" + target_id
                break
            case 3:
                target_url = "/recipe/" + target_id
                break
            default: 
                target_url = "/user/" + target_id
                break
        }
        this.props.history.push(target_url)
    }

    parse_to_description = (action) => {

        let verb = '';
        let target_url = ''
        switch (action.type) {
            case 0:
                verb = ' followed '
                target_url = "/user/" + action.target_id
                break
            case 1:
                verb = ' rated '
                target_url = "/recipe/" + action.target_id
                break
            case 3:
                verb = ' created '
                target_url = "/recipe/" + action.target_id
                break
            default: 
                verb = ' followed '
                target_url = "/user/" + action.target_id
                break
        }
        return <>
            <a
                href={"/user/" + action.from_id}
                onClick={(event) => this.to_from_page(event,action.from_id)}
            >
                {action.from_name}
            </a>
            {verb}
            <a
                href={target_url}
                onClick={(event) => this.to_target_page(event,action.type,action.target_id)}
            >{action.target_name}</a>
        </>
    }


    render() {
        return this.props.actions.map(
            (action, index) => {
                return <ActionCard
                    description={this.parse_to_description(action)}
                    image_url={action.image_url}
                    to_target_page = {(event) => this.to_target_page(event,action.type,action.target_id)}
                ></ActionCard>
            }
        )
    }



}

export default withRouter(ActionList);