import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      onClose: props.onClose
    }
  }


  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
    };

    // The modal "window"
    const modalStyle = {

    };

    return (
        <div className="backdrop" style={backdropStyle} onClick={this.props.onClose}>
          <div className="modal" style={modalStyle} onClick={e => e.stopPropagation()}>
            {this.props.children}
          </div>
        </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
}

export default Modal;
