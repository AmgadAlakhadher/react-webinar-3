import React, { memo } from 'react'
import cls from 'cart.module.scss';
import PropTypes from 'prop-types';

const Cart = ({cart,totalPrice, togglePopCart}) => {

  return (
    <>
      <div className={cls.App_cart}>
        {
          cart.length > 0
          ? <p>в корзине: <strong>{`${cart.length} товаров / ${totalPrice} ₽`}</strong></p> 
          : <p>в корзине: <strong>пусто</strong></p>
        }
        <button onClick={() => togglePopCart(true)}> Перейти </button>
      </div>
      
    </>
  )
}
Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      qty: PropTypes.number
  })),
  totalPrice: PropTypes.string,
  togglePopCart: PropTypes.func,
}
export default memo(Cart);