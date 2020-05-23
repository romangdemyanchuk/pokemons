import React, {Component} from "react";
import { Input } from '@material-ui/core';
import './SearchByName.css'

export default class SearchByName extends Component {
    state = {
        term:''
    };
    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    };
     render() {
        return (
            <form>
                <Input className="search-input" type="text" name="item"
                        placeholder="Search pokemon by name "
                        value={this.state.term}
                        onChange={this.onSearchChange}
                />
            </form>
        )
    }
};