import React, { memo } from 'react'
import cls from './head.module.scss';
import PropTypes from 'prop-types';

const Head = ({title,content}) => {
  return (
    <div className={cls.App_head}>
        <h1>{title}</h1>
        {
          content && content
        }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
}

export default memo(Head);