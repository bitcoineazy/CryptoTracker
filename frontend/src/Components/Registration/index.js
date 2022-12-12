import React from 'react';
import styles from './Registration.css';
import '../../generalCSS.css'
import gcss from '../../generalCSS.css'
import className from "classname";


class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    const registration_main = className({"registration_main": true, 'space_between_column':true})
    const title = className({"registration_title": true, 'bold_text':true})
    const registration_input_container = className({'column_list_flex_start': true, 'registration_input_container':true})
    const registration_input_text = className({'regular_text': true, 'registration_input_text':true})
    const registration_text_field_container = className({
      'column_list_flex_start': true,
      'registration_text_field_container': true,
    })
    const registration_button_container = className({'registration_button_container': true, 'white_text':true, 'bold_text':true})
    return (
        <div className={registration_main}>
          <span className={title}>Регистрация</span>
          <div className={registration_input_container}>
            <span className={registration_input_text}>Адрес эл. почты</span>
            <div className={registration_text_field_container}>
              <span className="v48_700">Введите ваш адрес эл. почты...</span>
            </div>
          </div>
          <div className={registration_input_container}>
            <span className={registration_input_text}>Имя пользователя</span>
            <div className={registration_text_field_container}>
              <span className="v49_875">Введите ваш адрес эл. почты...</span>
            </div>
          </div>
          <div className={registration_input_container}>
            <span className={registration_input_text}>Пароль</span>
            <div className={registration_text_field_container}>
              <span className="v48_706">Пароль...</span>
            </div>
          </div>
          <div className={registration_input_container}>
            <span className={registration_input_text}>Повторите пароль</span>
            <div className={registration_text_field_container}>
              <span className="v49_886">Пароль...</span>
            </div>
          </div>
          <div className={registration_button_container}>
            <span className="v48_705">Создать аккаунт</span>
          </div>
        </div>
    );
  }

}
export default Registration;
