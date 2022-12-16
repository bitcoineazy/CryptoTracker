import React from 'react';
import styles from './Registration.css';
import '../../generalCSS.css'
import gcss from '../../generalCSS.css'
import className from "classname";
import PropTypes from "prop-types";
import Log_in from "../Log_in";


class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
      password_2: null,
    }
  }


  render() {
    const registration_main = className({"registration_main": true, 'space_between_column':true})
    const title = className({"registration_title": true, 'bold_text':true})
    const registration_input_container = className({'column_list_flex_start': true, 'registration_input_container':true})
    const registration_input_text = className({'regular_text': true, 'registration_input_text':true})
    const registration_text_field = className({
      'column_list_flex_start': true,
      'log_in_text_field': true,
      'regular_text':true,
      'lite_black_text': true,

    })
    // Введите ваш адрес эл. почты...
    // Пароль...
    const registration_button_container = className({'registration_button_container': true, 'white_text':true, 'bold_text':true})
    return (
        <div className={registration_main}>
          <span className={title}>Регистрация</span>
          <div className={registration_input_container}>
            <span className={registration_input_text}>Адрес эл. почты</span>
            <input className={registration_text_field} onChange={e => this.setState({login: e.target.value})}/>
          </div>
          {
           /*
            <div className={registration_input_container}>
              <span className={registration_input_text}>Имя пользователя</span>
              <input className={registration_text_field}/>
            </div>
            */
          }

          <div className={registration_input_container}>
            <span className={registration_input_text}>Пароль</span>
            <input className={registration_text_field} onChange={e => this.setState({password: e.target.value})} type="password"/>
          </div>
          <div className={registration_input_container}>
            <span className={registration_input_text}>Повторите пароль</span>
            <input className={registration_text_field} onChange={e => this.setState({password_2: e.target.value})} type="password"/>
          </div>
          <button className={registration_button_container} onClick={() => {
            if (this.state.login === null) {
              alert("Введите логин!")
              return;
            }
            if (this.state.password === null) {
              alert("Введите пароль!")
              return;
            }
            if (this.state.password_2 === null) {
              alert("Повторите пароль!")
              return;
            }
            if (this.state.password_2 !== this.state.password) {
              alert("Пароли не совпадают!")
              return;
            }
            this.props.onClick(this.state.login, this.state.password)
          }


          }>
            <span>Создать аккаунт</span>
          </button>
        </div>
    );
  }

}

Registration.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Registration;
