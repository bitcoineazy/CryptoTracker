import React from 'react';

import './AddPortfolio.css'

import cross_white from '../../icons/cross_white.svg'

import className from 'classname'
import PropTypes from "prop-types";
import projectAPI from "../../API/projectAPI";


export default class AddPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
    this.projectAPI = new projectAPI();
  }


  render() {
    const main = className({'AddPortfolio_main': true, 'space_between_column':true})
    const title_line = className({"AddPortfolio_title_line": true, 'space_between_row':true})
    const title = className({"AddPortfolio_title": true, 'bold_text':true})
    const close_button = className({"AddPortfolio_close_button": true, 'row_list':true})
    const input_container = className({'column_list_flex_start': true, 'AddPortfolio_input_container':true})
    const input_text = className({'regular_text': true, 'AddPortfolio_input_text':true})
    const text_field = className({
      'column_list_flex_start': true,
      'AddPortfolio_text_field': true,
      'regular_text':true,
      'lite_black_text': true,
    })
    const button_container = className({'AddPortfolio_button_container': true, 'white_text':true, 'bold_text':true})

    return (
        <div className={main}>
          <div className={title_line}>
            <span className={title}>Добавить портфель</span>
            <button className={close_button} onClick={this.props.onClose}>
              <img src={cross_white} alt='' style={{height: 15, width: 15}}/>
            </button>
          </div>
          <div className={input_container}>
            <span className={input_text}>Название портфеля</span>
            <input className={text_field} onChange={e => this.setState({name: e.target.value})}/>
          </div>
          <button className={button_container} onClick={async (e) => {
            console.log("Click on AddPortfolio button")
            if (this.state.name === null) {
              alert("Укажите имя!")
              return;
            }
            await this.projectAPI.addPortfolio(this.props.token, this.state.name)
            this.props.onClick()
          }
          }>
            <span>Создать портфель</span>
          </button>
        </div>
    );
  }
}

AddPortfolio.propTypes = {
  token: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
