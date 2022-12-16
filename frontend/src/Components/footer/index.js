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
            <div className="text_info column_list">
              <span>Информация о нас</span>
              <span>Номера телефонов</span>
              <span>Ссылки на инструкции</span>
              <span>Почта для связи</span>
            </div>
          </div>
        </div>
    );
  }
}

export default Footer;
