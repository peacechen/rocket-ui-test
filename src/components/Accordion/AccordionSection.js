// Adapted from https://alligator.io/react/react-accordion-component/
// This is the individual expandable section.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccordionSection extends Component {
  static propTypes = {
    content: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div
        style={{
          background: isOpen ? '#eee' : '#bbb',
          border: '1px solid #008f68',
          borderRadius: '4px',
          padding: '5px 10px',
          margin: '5px',
        }}
      >
        <div
          onClick={onClick}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between'}}
        >
          <p><strong>{label}</strong></p>
          <div>
            {!isOpen && <span>&#9650;</span>}
            {isOpen && <span>&#9660;</span>}
          </div>
        </div>
        {isOpen && (
          <div
            style={{
              background: '#ddd',
              padding: '10px 20px',
            }}
          >
            {this.props.content}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;
