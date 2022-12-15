import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from "classname";

import cross from '../../icons/cross_grey.svg'
import './Add_active_window.css'


class Add_active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_real_cost: props.cost,
      active_cost: props.cost,
      active_count: 0,

    }
  }


  render() {
    const add_active_main = className({"add_active_main": true, 'space_between_column':true})
    const title_container = className({"add_active_title_container": true, 'space_between_row':true})
    const title = className({"add_active_title": true, 'bold_text':true})
    const close_button = className({"add_active_close_button": true, 'column_list': true})
    const choose_currency = className({"add_active_close_button": true, 'add_active_choose_currency':true, })
    const input_container = className({'column_list_flex_start': true, 'add_active_input_container':true})
    const input_text = className({'regular_text': true, 'add_active_input_text':true})
    const input_text_row = className({'row_list': true, 'input_text_row':true})
    const text_field_container = className({
      'column_list_flex_start': true,
      'add_active_text_field_container': true,
      'regular_text':true,
      'lite_black_text': true,

    })
    const text_field = className({
      'add_active_text_field': true,
      'regular_text':true,
      'lite_black_text': true,

    })
    const button_container = className({'add_active_button_container': true, 'white_text':true, 'bold_text':true})

    return (
        <div className={add_active_main}>
          <div className={title_container}>
            <span className={title}>Добавить актив</span>
            <button className={close_button} onClick={this.props.onClose}><img src={cross} style={{height: 20, width: 20}}/></button>
          </div>
          <div className={choose_currency}>
            <div className="v41_276">
              <div className="v41_337"></div>
              <span className="v41_278">Bitcoin</span>
              <span className="v41_279">BTC</span>
              <div className="v41_280"></div>
              <div className="name"></div>
            </div>
          </div>
          <div className={input_text_row}>
            <div className={input_container}>
              <span className={input_text}>Количество</span>
              <div className={text_field_container}>
                <input className={text_field} type="number" min="0" placeholder="0.00" onChange={(event)=> this.setState({'active_count': event.target.value})}/>
              </div>
            </div>
            <div className={input_container}>
              <span className={input_text}>Цена за монету</span>
              <div className={text_field_container}>
                <input className={text_field} type="number" min="0" placeholder={this.state.active_real_cost} onChange={(event)=> this.setState({'active_cost': event.target.value})}/>
              </div>
            </div>
          </div>
          <div className={input_container}>
          <span className={input_text}>Дата приобретения актива</span>
          <div className={text_field_container}>
            <input className={text_field} type="date" min="0" style={{width: '50%'}}/>
          </div>
        </div>
          <div className={input_container} style={{background: '#F1F1F1', borderRadius: 3, padding: 10}}>
            <span className={input_text}>Общий расход</span>
            <span className={text_field} style={{border: 0}}>$ {this.state.active_cost * this.state.active_count}</span>

          </div>
          <button className={button_container} onClick={this.props.onClick}>
            <span className="v62_69">Добавить актив</span>
          </button>
        </div>
    );
  }
}

Add_active.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Add_active;
