import React, { memo } from 'react'
import Item from '../Item/Item';
import PropTypes from 'prop-types';
import cls from 'list.module.scss';

const List = (props) => {
    const {
        list,
        onAddItemToCart,
        onSelect,
    } = props; 
    return (
        <div className={cls.List}>
            {
                list.map(item => <Item key={item.code} item={item} onAddItemToCart={onAddItemToCart} onSelect={onSelect}/> )
            }
        </div>
    )
}
List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number
    })),
    onAddItemToCart: PropTypes.func,
    onSelect: PropTypes.func
}
export default memo(List)