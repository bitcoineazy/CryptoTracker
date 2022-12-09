import React from 'react';
import logo from "../../icons/logo.png";
import './style.module.css';

class Footer extends React.Component {
  render() {
    return (
        <div className="mainline">
          <div className={"logovalue"}>
            <img src={logo} className="logoimg" alt="logo"/><span className="textlogo">CRYPTO TRACKER</span>
          </div>
          <div className="infous">
            <span className="textinfo">Информация о нас<br/>Номера телефонов<br/>Ссылки на инструкции<br/>Почта для связи</span>
          </div>
        </div>
    );
  }
}

export default Footer;
