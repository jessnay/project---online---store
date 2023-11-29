import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonAddCart from './ButtonAddCart';

class Search extends Component {
  addProduct = (product) => {
    product.quantidade = 1;
    const storage = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('cart', JSON.stringify([...storage, product]));
  }

  render() {
    const { results } = this.props;
    return (
      <section className="container-search flex-container">
        {
          results.map((product) => (
            <div
              key={ product.id }
              data-testid="product"
              className="container-products flex-container col"
            >
              <Link
                data-testid="product-detail-link"
                to={ `/product-details/${product.id}` }
              >
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{ product.title }</p>
                <p>
                  {`R$${
                    product.price
                      .toLocaleString(
                        'pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        },
                      )
                  }`}
                </p>
              </Link>
              <ButtonAddCart
                addProduct={ this.addProduct }
                product={ product }
                dataTestId="product-add-to-cart"
              />
            </div>
          ))
        }
      </section>
    );
  }
}

Search.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Search;
