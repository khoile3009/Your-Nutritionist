import React, {Component} from 'react';
import ActionCard from '../../Components/ActionCard/ActionCard'

class ActionList extends Component{
    // required props: Get next 20 actions
    constructor(props){
        super(props);
        this.state = {
            actions: props.actions
        }
    }

    render(){
        return this.state.actions.map(
            (action, index) => {
                return <ActionCard
                    image_url = {action.image_url}
                    from_name = {action.from_name}
                    target_name = {action.target_name}
                ></ActionCard>
            }
        )
    }

    

}

export default ActionList;