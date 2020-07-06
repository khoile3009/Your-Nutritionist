import React, { Component } from 'react'
import { FormControl, InputGroup, Button, Modal} from 'react-bootstrap'
import Popup from "reactjs-popup";
import './RecipeSearchbox.css'
import axios from '../../axios-orders'
import SearchHelp from '../../Components/SearchHelp/SearchHelp'

class RecipeSearchbox extends Component {

    constructor(props){
        super(props)
        this.state = {
            showModal : false,
            searchQuery: ''
        }
        this.hideModal = this.hideModal.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleChangeSearchQuery = this.handleChangeSearchQuery.bind(this)
        this.search = this.search.bind(this)
    }

    hideModal = () => {
        this.setState({showModal: false})
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    handleChangeSearchQuery = (event) => {
        this.setState({searchQuery: event.target.value})
    }

    search = () => {
        axios.get('api/recipe', {
            params: {
                query: this.state.searchQuery
            }
        })
        .then(
            (response) => {
                this.props.setRecipes(response.data.recipes)
            }
        )
    }

    render() {
        return <div className='searchbox-container'>
            <InputGroup className="searchbox">
                {/* <InputGroup.Prepend>
                    <Popup
                    trigger={<Button variant="outline-secondary">Button</Button>}
                    position='bottom center'
                    on='hover'
                    >
                        <SearchHelp></SearchHelp>
                    </Popup>
                      
                </InputGroup.Prepend>    */}
                <FormControl placeholder="Search recipes or users" className='search-txt' aria-describedby="basic-addon1" value={this.props.query} onChange={this.props.setSearchQuery}/>
                <InputGroup.Append>
                    <Button className='search-button' variant="secondary" onClick={this.props.search}></Button>
                </InputGroup.Append>
            </InputGroup>

        </div>
    }
}

export default RecipeSearchbox;