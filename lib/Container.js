'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Image = require('./Image');

module.exports = React.createClass({
  displayName: 'Container',
  propTypes: {
    selectedImage: React.PropTypes.number,
    images: React.PropTypes.array.isRequired,
    toggleLightbox: React.PropTypes.func.isRequired,
    showImageModifiers: React.PropTypes.bool,
    renderDescriptionFunc: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      selectedImage: 0,
      renderDescriptionFunc: function renderDescriptionFunc(image) {
        return React.createElement(
          'div',
          null,
          'image.description'
        );
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      selectedImageIndex: this.props.selectedImage
    };
  },
  handleLeftClick: function handleLeftClick() {
    if (this.canMoveToLeft()) {
      this.setState({
        selectedImageIndex: this.state.selectedImageIndex - 1
      });
    };
  },
  handleRightClick: function handleRightClick() {
    if (this.canMoveToRight()) {
      this.setState({
        selectedImageIndex: this.state.selectedImageIndex + 1
      });
    };
  },
  canMoveToLeft: function canMoveToLeft() {
    return this.state.selectedImageIndex > 0;
  },
  canMoveToRight: function canMoveToRight() {
    return this.state.selectedImageIndex < this.props.images.length - 1;
  },
  render: function render() {
    var props = this.props;
    var state = this.state;

    var image = props.images[state.selectedImageIndex];
    var leftButton = undefined,
        rightButton = undefined;
    var description = props.renderDescriptionFunc.call(this, image);

    if (this.canMoveToLeft()) leftButton = React.createElement(
      'div',
      { className: 'lightbox-btn-left' },
      React.createElement(
        'button',
        { className: 'lightbox-btn', onClick: this.handleLeftClick },
        React.createElement('i', { className: 'fa fa-3x fa-chevron-left' })
      )
    );
    if (this.canMoveToRight()) rightButton = React.createElement(
      'div',
      { className: 'lightbox-btn-right' },
      React.createElement(
        'button',
        { className: 'lightbox-btn', onClick: this.handleRightClick },
        React.createElement('i', { className: 'fa fa-3x fa-chevron-right' })
      )
    );
    return React.createElement(
      'div',
      { className: 'lightbox-backdrop' },
      React.createElement(
        'div',
        { className: 'lightbox-btn-close' },
        React.createElement(
          'button',
          { className: 'lightbox-btn', onClick: props.toggleLightbox },
          React.createElement('i', { className: 'fa fa-lg fa-times' })
        )
      ),
      React.createElement(
        'div',
        { className: 'lightbox-title-content' },
        React.createElement(
          'div',
          { className: 'lightbox-title' },
          image.title
        ),
        React.createElement(
          'div',
          { className: 'lightbox-description' },
          description
        )
      ),
      React.createElement(Image, { src: image.src, showImageModifiers: props.showImageModifiers }),
      leftButton,
      rightButton
    );
  }
});