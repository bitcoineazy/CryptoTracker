import React from 'react';
import './Header.css';
import logo from "../../icons/logo.png";
import downBlack from "../../icons/DOWN_black.svg";
import portfolio from "../../icons/portfolio.svg";
import star from "../../icons/star.svg";
import pannel from "../../icons/pannel.svg";
import home_svg from "../../icons/main_home.svg"
import loop from "../../icons/loop.svg";

class Header extends React.Component {
  render() {
    return (
        <div className="big_background column_list">
          <div className="tracker_logo">
            <div className="text_logo_1">
              <div className="text_logo_2">
                <img src={logo} alt="logo here" style={{height: 59, width: 59}}/>
              </div>
              <span className="text_logo_3">CRYPTO TRACKER</span>
            </div>
            <div className="text_lang_curr">
              <div className="text_curr_1">
                <span className="text_curr_2">Валюта $</span>
              </div>
              <a href="home">
                <div className="panel_menu">
                  <div className="v125_126">
                    <img src={home_svg} alt="pannel here"/>
                  </div>
                </div>
              </a>
              <a href="user">
                <div className="portfolio">
                  <div className="v125_122">
                    <img src={portfolio} alt="portfolio here"/>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
    );
  }
}

export default Header;
