import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  //listener for change in state in the search form
  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  //listener for the submit button
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearchSubmit(this.state.search);
  };

  render() {
    return (
      <div className="search">
        <form>
          <input
            id="searchbar"
            type="text"
            name="search"
            placeholder="Search for saved reports..."
            value={this.state.search}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
export default SearchBar;
