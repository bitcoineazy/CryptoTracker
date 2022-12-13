import React from 'react';
import '../../generalCSS.css'
import gcss from '../../generalCSS.css'
import styles from './Log_in.css';
import className from 'classname'
import PropTypes from "prop-types";
import Modal from "../Modal/modal_window";

class Log_in extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const log_in_main = className({"log_in_main": true, 'space_between_column':true})
    const title = className({"log_in_title": true, 'bold_text':true})
    const log_in_input_container = className({'column_list_flex_start': true, 'log_in_input_container':true})
    const log_in_input_text = className({'regular_text': true, 'log_in_input_text':true})
    const log_in_text_field = className({
      'column_list_flex_start': true,
      'log_in_text_field': true,
      'regular_text':true,
      'lite_black_text': true,
    })
    const log_in_forgot_password = className({'log_in_forgot_password': true, 'grey_text':true, 'regular_text':true})
    const log_in_button_container = className({'log_in_button_container': true, 'white_text':true, 'bold_text':true})

    return (
        <div className={log_in_main}>
          {gcss.column_list}
          <span className={title}>Вход</span>
          <div className={log_in_input_container}>
            <span className={log_in_input_text}>Имя пользователя</span>
            <input className={log_in_text_field} placeholder="Логин"/>
            {/*
              <span className='regular_text grey_text'>Введите ваш адрес эл. почты...</span>
              */}
          </div>
          <div className={log_in_input_container}>
            <span className={log_in_input_text}>Пароль</span>
            <input className={log_in_text_field} type="password" placeholder="Пароль"/>
            <span className={log_in_forgot_password}>Забыл пароль</span>
          </div>
          <button className={log_in_button_container} onClick={this.props.onClick}>
            <span className="v62_69">Войти</span>
          </button>
        </div>
    );
  }
}

Log_in.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Log_in;
