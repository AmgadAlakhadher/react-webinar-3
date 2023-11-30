import React, { memo } from "react";
import PropTypes from 'prop-types';

function PageLayout({content}) {
    return (
        <div >
            {content}
        </div>
    )
}

PageLayout.propTypes = {
    content: PropTypes.node,
}

export default memo(PageLayout);