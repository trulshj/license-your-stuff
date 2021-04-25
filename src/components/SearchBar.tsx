import React, { Component } from "react";
import RepositoriesList from "./RepositoriesList";
import "./SearchBar.css";

class SearchBar extends Component<
    {},
    { searchValue: string; inputValue: string }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            inputValue: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleInputChange(event: any) {
        this.setState({
            inputValue: event.target.value,
        });
    }

    handleClick() {
        this.setState({ searchValue: this.state.inputValue, inputValue: "" });
        setTimeout(() => {}, 1000);
    }

    handleKeypress(event: any) {
        console.log(event.keyCode)
        if (event.key === "Enter") {
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <div className='search'>
                    <label className='customInput'>
                        <input
                            required={true}
                            type='text'
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleKeypress}
                        />
                        <span className='placeholder'>username</span>
                    </label>
                    <button onClick={this.handleClick}>CHECK LICENSES</button>
                </div>
                <RepositoriesList username={this.state.searchValue} />
            </div>
        );
    }
}

export default SearchBar;
