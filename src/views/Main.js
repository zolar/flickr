import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import { Map as iMap } from 'immutable';

import ButtonComponent from './../components/button';

import styles from './styles';

export default class MainComponent extends Component {
  /**
  * Call action to loads first images when compoent mounts
  */
  componentDidMount = () => {
    this.props.flickrGetData();
  }

  /**
  * Checks index of current image, if is close to the end, load next 10
  */
  componentDidUpdate = () => {
    const flickr = _get(this, 'props.store.flickr');

    if (!flickr.get('isLoading')) {
      const data = flickr.get('data');
      const currentIndex = flickr.get('currentIndex');
      const totalPages = flickr.get('totalPages');
      const currentPage = flickr.get('requestParams').get('page');

      if (data.size && currentIndex === data.size - 2 && currentPage < totalPages) {
        this.props.flickrGetData();
      }
    }
  }
  // Increments current image index
  onNextClickHandler = () => {
    const { flickr } = this.props.store;
    const { flickrGetNext } = this.props;

    if (!flickr.get('isLoading')) {
      flickrGetNext();
    }
  }
  // Calls action to decrement current index
  onPreviousClickHandler = () => {
    const { flickr } = this.props.store;
    const { flickrGetPrevious } = this.props;

    if (!flickr.get('isLoading')) {
      flickrGetPrevious();
    }
  }
 // Formates background image src value from immutable image object
  getFlickrImageUrl = image => (
    `//farm${image.get('farm')}.staticflickr.com/${image.get('server')}/${image.get('id')}_${image.get('secret')}.jpg`
  );

  // Get Header label based on loading state
  getHeaderText = flickr => ((flickr.get('isLoading')) ? 'Flickr Loading...' : 'Flickr');
  // Get css for image background
  getMainStyle = (flickr) => {
    const currentIndex = flickr.get('currentIndex');
    const data = flickr.get('data');
    const backgroundImage = (data.size) ? this.getFlickrImageUrl(data.get(currentIndex)) : '//placeimg.com/640/480/any';

    const background = {
      backgroundAttachment : 'fixed',
      backgroundRepeat     : 'no-repeat',
      backgroundOrigin     : 'content-box',
      backgroundPosition   : 'center',
      backgroundSize       : 'cover',
      backgroundImage      : `url(${backgroundImage})`,
    };

    return { ...styles.content, ...background };
  }

  render() {
    const { flickr } = this.props.store;

    return (
      <div style={styles.container}>
        <header style={styles.header}>{this.getHeaderText(flickr)}</header>
        <main style={this.getMainStyle(flickr)} />
        <footer style={styles.footer}>
          <ButtonComponent label="Previous" onClick={this.onPreviousClickHandler} />
          <ButtonComponent label="Next" onClick={this.onNextClickHandler} />
        </footer>
      </div>
    );
  }
}

MainComponent.defaultProps = { store : { flickr : PropTypes.instanceOf(iMap) } };
MainComponent.propTypes = {
  store             : PropTypes.shape({ flickr : PropTypes.instanceOf(iMap) }),
  flickrGetData     : PropTypes.func,
  flickrGetNext     : PropTypes.func,
  flickrGetPrevious : PropTypes.func,
};
