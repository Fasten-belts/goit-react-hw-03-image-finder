import React, { Component } from 'react';
import toast from 'react-hot-toast';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleValueChange = evt => {
    this.setState({ value: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = this.state;
    if (value.trim() === '') {
      return toast.error('Please wright your request');
    }
    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    const onChange = this.handleValueChange;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            name="query"
            value={value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChange}
          />
        </form>
      </header>
    );
  }
}
