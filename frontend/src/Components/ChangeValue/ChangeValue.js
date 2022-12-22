import React, {Component} from 'react';
import UP from "../../icons/UP.svg";
import DOWN from "../../icons/DOWN.svg";
import PropTypes from 'prop-types';
import className from "classname";
import '../../generalCSS.css';



class MyComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const active_change_percent_container = className(
        {
          'row_list': true,
          'ChangeValueStyle': true,
          'green_text': this.props.value > 0,
          'grey_text': this.props.value === 0,
          'red_text': this.props.value < 0,
        })
    const active_change_text = className({
      'ChangeValueStyleText': true,
      'regular_text': true,
    })
    return (
        <div className={active_change_percent_container}>
          <div>
            {
              this.props.value !== 0 ?
                  <img src={this.props.value > 0 ? UP : DOWN} alt=""
                       style={{height: 15, width: 15}}/> : null
            }
          </div>
          <div className={active_change_text}>
            {Math.abs(this.props.value)}
          </div>
        </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.node,
};

export default MyComponent;


