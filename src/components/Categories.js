import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.loadAPI();
  }

  loadAPI = async () => {
    const categories = await api.getCategories();
    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
    const { loadAPICategoryAndQuery } = this.props;
    return (
      <nav className="container-categories flex-container col">
        {
          categories.map((category) => (
            <label
              key={ category.id }
              htmlFor={ category.id }
              data-testid="category"
            >
              <input
                type="radio"
                id={ category.id }
                name="category"
                value={ category.id }
                onClick={ loadAPICategoryAndQuery }
              />
              { category.name }
            </label>
          ))
        }
      </nav>
    );
  }
}

Categories.propTypes = {
  loadAPICategoryAndQuery: PropTypes.func.isRequired,
};

export default Categories;
