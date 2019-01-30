import React, { PureComponent } from 'react';
import ResponsiveModal from 'react-responsive-modal';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
  render() {
    return (
      <ResponsiveModal
        open={this.props.open}
        onClose={this.props.onCloseModal}
        container={modalRoot}
      >
        {this.props.children}
      </ResponsiveModal>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default Modal;
