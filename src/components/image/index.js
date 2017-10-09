import React from 'react';
import PropTypes from 'prop-types';
import { Map as iMap } from 'immutable';

import styles from './styles';

const ImageComponent = (props) => {
  const { data } = props;

  return (
    <div style={styles.container}>
      <img
        role="presentation"
        title={data.get('title')}
        src={`//farm${data.get('farm')}.staticflickr.com/${data.get('server')}/${data.get('id')}_${data.get('secret')}.jpg`}
        style={styles.image}
      />
    </div>
  );
};

ImageComponent.defaultProps = { data : iMap({}) };
ImageComponent.propTypes = { data : PropTypes.instanceOf(iMap) };

export default ImageComponent;
