import React, { memo, useState } from 'react'
import cls from 'item.module.scss';
import PropTypes from 'prop-types';
import { plural } from '../../utils';

const Item = (props) => {
  const [count, setCount] = useState(0);
  const {
    item,
    onAddItemToCart,
    // onSelect,
    onDeleteItem,
    isCart
  } = props; 

  const price = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(item.price);
  const onClick = () => {
    // onSelect(item.code);
    if(!item.selected) {
      setCount(count+1);
    }
  }

  return (
    <div key={item.code} className={cls.List_item}>
        <div className={ `${cls.Item} ${(item.selected ? cls.Item_selected : '')}`}
                onClick={onClick}>
            <div className={cls.Item_code}>{item.code}</div>
            <div className={cls.Item_title}>
              {`${item.title} ${count > 0 && !isCart? ` | Выделяли ${count} ${plural(count, {one: 'раз',few: 'раза', many: 'раз'})}` : "" }`}
            </div>
            <div className={cls.Item_actions}>
              <p className={cls.price}>{price} ₽</p>
              {
                isCart ? 
                  <>
                    <p className={cls.qty}>{item.qty} шт</p>
                    <button onClick={() => onDeleteItem(item.code)}>
                      Удалить
                    </button>
                  </>
                  :
                  <button onClick={() => onAddItemToCart(item.code)}>
                    Добавить
                  </button>
              }
            </div>
        </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.object,
  onAddItemToCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isCart: PropTypes.bool,
  // onSelect: PropTypes.func,
};

export default memo(Item)
