import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from "classname";

import './ChooseActive.css'

class ChooseActive extends Component {
  render() {
    const container = className({'choose_active_container': true})
    const text_field = className({'choose_active_text_field': true, 'regular_text':true, 'lite_black_text': true,})

    return (
        <div className={container} style={{width:'50%'}}>
          <input className={text_field} type="text"/>
        </div>
    );
  }
}

ChooseActive.propTypes = {
  children: PropTypes.node,
};

export default ChooseActive;
