import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

export default class ButtonComponent extends Component {
  constructor(args) {
    super(args);

    this.state = { isHovering : false };
  }

  onMouseEnter = () => this.setState({ isHovering : true });
  onMouseLeave = () => this.setState({ isHovering : false });

  render() {
    const {
      label,
      onClick,
    } = this.props;

    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={onClick}
        style={this.state.isHovering ? styles.containerOver : styles.container}
      >
        <span>{label}</span>
      </div>
    );
  }
}

ButtonComponent.defaultProps = { label : 'button' };
ButtonComponent.propTypes = {
  label   : PropTypes.string,
  onClick : PropTypes.func,
};
