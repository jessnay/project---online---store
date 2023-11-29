import React, { Component } from 'react';
import brazilianStates from '../data/brazilianStates';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.getProducts();
    this.setCheckoutPrice();
  }

  getProducts = () => {
    this.setState({
      cart: JSON.parse(localStorage.getItem('cart')),
    });
  }

  setCheckoutPrice = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let total;
    let productPrice;
    if (cart) {
      productPrice = cart
        .map((product) => product.price * product.quantidade);
      total = productPrice
        .reduce((acc, curr) => {
          const result = acc + curr;
          return result;
        });
    }
    const result = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return result;
  }

  render() {
    const { cart } = this.state;
    const total = this.setCheckoutPrice();
    return (
      <main className="flex-container col">
        <div className="block row">
          <p className="block col">Produtos</p>
          <p className="block col">Quantidade</p>
          <p className="block col">Preço</p>
        </div>
        <div className="block col">
          {cart.map((product) => (
            <div key={ product.id } className="block row">
              <div className="block row">
                <img src={ product.thumbnail } alt={ product.title } />
                <p data-testid="shopping-cart-product-name">{ product.title }</p>
              </div>
              <p className="block col">{product.quantidade}</p>
              <p className="block col">
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
            </div>
          ))}
          <p>{`Total: R$${total}`}</p>
        </div>
        <fieldset className="block col">
          <legend>Informações do Comprador</legend>
          <div className="block row">
            <label htmlFor="checkout-fullname" className="block row">
              <span className="form-label-text">
                Nome Completo
              </span>
              <input
                type="text"
                id="checkout-fullname"
                data-testid="checkout-fullname"
                className="form-input"
              />
            </label>
            <label htmlFor="checkout-email" className="block row">
              <span className="form-label-text">
                Email
              </span>
              <input
                type="email"
                id="checkout-email"
                data-testid="checkout-email"
                className="form-input"
              />
            </label>
          </div>
          <div className="block row">
            <label htmlFor="checkout-cpf" className="block row">
              <span className="form-label-text">
                CPF
              </span>
              <input
                type="text"
                id="checkout-cpf"
                data-testid="checkout-cpf"
                className="form-input"
              />
            </label>
            <label htmlFor="checkout-phone" className="block row">
              <span className="form-label-text">
                Telefone
              </span>
              <input
                type="text"
                id="checkout-phone"
                data-testid="checkout-phone"
                className="form-input"
              />
            </label>
          </div>
        </fieldset>
        <fieldset className="block col">
          <legend>Endereço de Cobrança</legend>
          <div className="block row">
            <label htmlFor="checkout-cep" className="block row">
              <span className="form-label-text">
                CEP
              </span>
              <input
                type="text"
                id="checkout-cep"
                data-testid="checkout-cep"
                className="form-input"
              />
            </label>
            <label htmlFor="checkout-address" className="block row">
              <span className="form-label-text">
                Endereço
              </span>
              <input
                type="text"
                id="checkout-address"
                data-testid="checkout-address"
                className="form-input"
              />
            </label>
            <label htmlFor="checkout-address-complement" className="block row">
              <span className="form-label-text">
                Complemento
              </span>
              <input
                type="text"
                id="checkout-address-complement"
                className="form-input"
              />
            </label>
          </div>
          <div className="block row">
            <label htmlFor="checkout-address-number" className="block row">
              <span className="form-label-text">
                Número
              </span>
              <input
                type="text"
                id="checkout-address-number"
                className="form-input"
              />
            </label>
            <label htmlFor="checkout-address-city" className="block row">
              <span className="form-label-text">
                Cidade
              </span>
              <input
                type="text"
                id="checkout-address-city"
                className="form-input"
              />
            </label>
            <label htmlFor="checkout-address-state" className="block row">
              <span className="form-label-text">
                Estado
              </span>
              <select id="checkout-address-state" className="form-input">
                {brazilianStates
                  .map((state) => <option key={ state } value={ state }>{state}</option>)}
              </select>
            </label>
          </div>
        </fieldset>
        <fieldset className="block col">
          <legend>Método de Pagamento</legend>
          <div className="block">
            <label htmlFor="checkout-boleto" className="block row">
              <span>Boleto</span>
              <input type="radio" id="checkout-boleto" />
            </label>
            <label htmlFor="checkout-credit-card" className="block row">
              <span>Cartão de Crédito</span>
              <input type="radio" id="checkout-credit-card" />
            </label>
            <label htmlFor="checkout-credit-card" className="block row">
              <span>Pix</span>
              <input type="radio" id="checkout-credit-card" />
            </label>
          </div>
        </fieldset>
        <button type="button" className="btn">Finalizar Compra</button>
      </main>
    );
  }
}

export default Checkout;
