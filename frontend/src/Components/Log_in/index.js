import React from 'react';
import '../../generalCSS.css'
import gcss from '../../generalCSS.css'
import styles from './Log_in.css';
import className from 'classname'

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
    const log_in_text_field_container = className({
      'column_list_flex_start': true,
      'log_in_text_field_container': true,
    })
    const log_in_forgot_password = className({'log_in_forgot_password': true, 'grey_text':true, 'regular_text':true})
    const log_in_button_container = className({'log_in_button_container': true, 'white_text':true, 'bold_text':true})

    return (
        <div className={log_in_main}>
          {gcss.column_list}
          <span className={title}>Вход</span>
          <div className={log_in_input_container}>
            <span className={log_in_input_text}>Имя пользователя</span>
            <div className={log_in_text_field_container}>
              <span className='regular_text grey_text'>Введите ваш адрес эл. почты...</span>
            </div>
          </div>
          <div className={log_in_input_container}>
            <span className={log_in_input_text}>Пароль</span>
            <div className={log_in_text_field_container}>
              <span className='regular_text grey_text'>Пароль...</span>
            </div>
            <span className={log_in_forgot_password}>Забыл пароль</span>
          </div>
          <div className={log_in_button_container}>
            <span className="v62_69">Войти</span>
          </div>
        </div>
    );
  }
}

export default Log_in;
