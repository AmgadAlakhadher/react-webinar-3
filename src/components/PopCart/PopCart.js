import React, {memo} from 'react'
import cls from './popCart.module.scss';
import Head from '../Head/Head';
import Item from '../Item/Item';
import PropTypes from 'prop-types';

const PopCart = ({onToggle,cart,onDeleteItem,totalPrice}) => {
  return (
    <div  className={cls.popCart}>
      <Head title="Корзина" content={
        <>
            <button onClick={onToggle}>Закрыть</button>
        </>
     }/>
     {
        cart.length? 
            <div className={cls.popCart__body}>
                {cart.map((item) =>  <Item key={item.code} item={item} isCart={true} onDeleteItem={onDeleteItem}/>)}
                <div className={cls.popCart__total}>
                    <p>Итого <span className={cls.popCart__total_span}>{totalPrice} ₽</span></p>
                </div>
            </div>
        : <p style={{textAlign: 'center'}}>Корзина пустая :( </p> 
     }

    </div>
  )
}

PopCart.popTypes = {
    onToggle: PropTypes.func,
    cart: PropTypes.arrayOf(PropTypes.object),
    onDeleteItem: PropTypes.func,
    totalPrice: PropTypes.string
}

export default memo(PopCart)
