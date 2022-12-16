import React from 'react';
import './Header.css';
import logo from "../../icons/logo.png";
import downBlack from "../../icons/DOWN_black.svg";
import portfolio from "../../icons/portfolio.svg";
import star from "../../icons/star.svg";
import pannel from "../../icons/pannel.svg";
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
                        <div className="text_lang_2">
                            <span className="text_lang_3">Русский</span>
                            <img src={downBlack} alt="triangle here"/>
                        </div>
                        <div className="text_curr_1">
                            <span className="text_curr_2">Валюта $</span>
                            <img src={downBlack} alt="triangle here"/>
                        </div>
                        <div className="portfolio">
                            <div className="v125_122">
                                <img src={portfolio} alt="portfolio here"/>
                            </div>
                        </div>
                        <div className="star">
                            <img src={star} alt="star here"/>
                        </div>
                        <div className="panel_menu">
                            <div className="v125_126">
                                <img src={pannel} alt="pannel here"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel_text">
                    <div className="crypto"><span className="v125_129">Криптовалюты:</span><span className="crypto-value">21 434</span>
                    </div>
                    <div className="exchange-place"><span className="v125_132">Биржи:</span><span
                        className="exchange-value">527</span></div>
                    <div className="market-cap"><span className="v125_135">Рыночная капитализация:</span>
                        <span className="market-cap-value">$913 528 974 940,087</span></div>
                    <div className="volume24"><span className="v125_138">Объем за 24ч:</span>
                        <span className="volume24value">$45 396 808 219,34</span></div>
                    <div className="domination"><span className="v125_141">Доминирование:</span>
                        <span className="domination-value">BTC: 40.0% ETH: 17.2%</span></div>
                    <div className="search">
                        <div className="textsearch">
                            <img src={loop} alt="loop here"/>
                        </div>
                        <span className="v125_145">Search</span>
                        <div className="v125_146"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
