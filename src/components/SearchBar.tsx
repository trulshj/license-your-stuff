import React, { Component } from 'react';
import RepositoriesList from './RepositoriesList';

class SearchBar extends Component<{}, { searchValue: string, inputValue: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            inputValue: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleInputChange(event: any) {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleClick() {
        this.setState({ searchValue: this.state.inputValue, inputValue: "" });
        setTimeout(() => {}, 1000);
    }


    render() {
        return(
            <div>
                <input 
                    type="text"
                    placeholder="username"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleClick}>Check Licenses</button>
                <RepositoriesList username={this.state.searchValue} />
            </div>
        );
    }
}

export default SearchBar;