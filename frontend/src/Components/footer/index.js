import React from 'react';
import logo from "../../icons/logo.png";
import './Footer.css';
import styles from './Footer.css'


class Footer extends React.Component {
  render() {
    return (
        <div className="main_line space_between_row">
          <div className="logo_value">
            <img src={logo} className="logo_img" alt="logo" style={{width: 59, height: 59}}/>
            <span className="text_logo">CRYPTO TRACKER</span>
          </div>
          <div className="in_focus">
            <span className="text_info">Информация о нас<br/>Номера телефонов<br/>Ссылки на инструкции<br/>Почта для связи</span>
          </div>
        </div>
    );
  }
}

export default Footer;
