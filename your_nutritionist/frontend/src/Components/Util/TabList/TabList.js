import React, {Component} from 'react';
import './TabList.scss'
class TabList extends Component{

// props needs active: int, tabs: array, switchTab method

    render(){
        return <div className="tab-list-wrapper">
            {
                this.props.tabs.map(
                    (tab, index) => {
                        return <span
                                className={index == this.props.active ? "subtitle tab-nav tab-nav-active" : "subtitle tab-nav"}
                                onClick={() => {
                                    this.props.switchTab(index);
                                }}
                            >
                                {tab}
                            </span>
                    }
                )
            }
        </div> 
        
    }
}

export default TabList