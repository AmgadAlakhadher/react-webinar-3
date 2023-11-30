import React, { useCallback, useState } from 'react';
// import {createElement} from './utils.js';
import cls from './app.module.scss';
import { 
  Cart, 
  List,
  Head,
  PageLayout,
  PopCart
} from './components/index.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart} = store.getState();
  const [popCart,togglePopCart] = useState(false);
  const total =  cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const price = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(parseInt(total));
  const callback = {
    onSelect: useCallback((code) => {
      store.selectItem(code);
    },[store]),
    onAddItemToCart: useCallback((code) => {
      store.onAddItemToCart(code);
    },[store]),
    onDeleteItem: useCallback((code) => {
      store.onDeleteItem(code);
    },[store]),
  }

  return (
    <>
      <div className={cls.App}>
        <PageLayout content={
          <>
            <Head title="Магазин" />
            <Cart 
              cart={cart} 
              totalPrice={price} 
              togglePopCart={()=>togglePopCart(!popCart)}    
            />
            <List 
              list={list} 
              onAddItemToCart={callback.onAddItemToCart} 
              onSelect={callback.onSelect}
            />
          </>      
        } />
      </div>
      {
        popCart && 
        <>
           <PopCart 
            cart={cart} 
            onToggle={()=>togglePopCart(!popCart)} 
            totalPrice={price} 
            onDeleteItem={callback.onDeleteItem} 
          />
          <div className={cls.overlay}></div>
        </>
      }
    </>
  );
}

export default App;
