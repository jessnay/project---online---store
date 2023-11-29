import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import ButtonAddCart from './ButtonAddCart';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      attributes: [],
      evaluations: [],
      email: '',
      stars: 0,
      evaluation: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductFromId(id);
    const { attributes } = product;
    this.setState({
      product,
      attributes,
    });
    this.getEvaluation();
  }

  setEvaluation = () => {
    const { email, stars, evaluation } = this.state;
    const { match: { params: { id } } } = this.props;
    const evaluations = JSON.parse(localStorage.getItem('evaluations'));
    localStorage
      .setItem('evaluations',
        JSON.stringify([...evaluations, { id, email, stars, evaluation }]));
    this.getEvaluation();
    this.setState({
      email: '',
      stars: '',
      evaluation: '',
    });
  }

  getEvaluation = () => {
    this.setState({
      evaluations: JSON.parse(localStorage.getItem('evaluations')),
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox' || target.type === 'radio')
      ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  addProduct = (product) => {
    product.quantidade = 1;
    const storage = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('cart', JSON.stringify([...storage, product]));
  }

  setStars = ({ target: { value } }) => {
    this.setState({
      stars: parseInt(value, 10),
    });
  }

  // Referência:  https://devpleno.com/loopsrepeticoesiteracoes-no-jsx-do-react
  rowStars = () => {
    // return <div className="rate" data-testeid={ `${index}-rating` }>teste</>;
    const buttons = [];
    const max = 5;
    for (let index = 1; index <= max; index += 1) {
      const button = (
        <button
          type="button"
          data-testid={ `${index}-rating` }
          value={ index }
          onClick={ this.setStars }
        >
          {index}
        </button>
      );
      buttons.push(button);
    }
    return buttons;
  }

  render() {
    const { product, email, evaluation, evaluations, attributes } = this.state;
    const { match: { params: { id } } } = this.props;
    const stars = this.rowStars();

    return (
      <div>
        <header className="container-header">
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            <div className="icon-cart" />
          </Link>
        </header>
        <div className="container-product-detail flex-container row">
          <h2
            data-testid="product-detail-name"
          >
            {`${product.title} - R$${product.price}`}
          </h2>
          <figure className="figure-container flex-container col">
            <img src={ product.thumbnail } alt={ `Imagem do ${product.title} ` } />
            <ButtonAddCart
              addProduct={ this.addProduct }
              product={ product }
              dataTestId="product-detail-add-to-cart"
            />
          </figure>
          <div className="container-product-technical-detail">
            <h3>Especificações Técnicas</h3>
            <ul>
              {
                attributes.map((attribute) => (
                  <li key={ attribute.id }>
                    { `${attribute.name}: ${attribute.value_name}` }
                  </li>))
              }
            </ul>
          </div>
          {/* Referência:  https://devpleno.com/loopsrepeticoesiteracoes-no-jsx-do-react */}
          <div className="container-evaluation flex-container col">
            <h2>Avalie o Produto</h2>
            <input
              type="email"
              placeholder="Digite seu email"
              data-testid="product-detail-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
            <div className="container-stars flex-container row">
              {stars}
            </div>
            <textarea
              placeholder="Deixe aqui seu comentário"
              data-testid="product-detail-evaluation"
              name="evaluation"
              value={ evaluation }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.setEvaluation }
            >
              Avaliar
            </button>
          </div>
          <div>
            Avaliações
            {
              evaluations.map((evaluate, index) => {
                let result;
                if (evaluate.id === id) {
                  result = (
                    <div key={ index }>
                      <p>{evaluate.email}</p>
                      <p>{evaluate.stars}</p>
                      <p>{evaluate.evaluation}</p>
                    </div>
                  );
                }
                return result;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetails;
