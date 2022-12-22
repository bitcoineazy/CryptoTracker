import React from "react"
import "./main.css"
import styles from "./main.css"
import Footer from "../../Components/footer";
import Modal from "../../Components/Modal/modal_window";
import Log_in from "../../Components/Log_in";
import Registration from "../../Components/Registration";
import Add_active from "../../Components/Add_active";
import AssetsInfo from "../../Components/AssetsInfo";
import Header from "../../Components/Header";

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      data: props.item_data
    };

  }

  render() {
    const top_items = [];
    for (let i = 0; i < this.state.data.length && i < 5; i++) {
      let na = this.state.data[i].name
      top_items.push(
          <div className="top_line">
            <span className="header_top_text">{i + 1}. {this.state.data[i].name}</span>
            <span className="header_top_text">{this.state.data[i].value}%</span>
          </div>
      )
    }

    return (
        <div className="top">
          <div className="top_head">
            <span className="top_head_text">{this.state.label}</span>
            <span className="top_head_text">показать все ></span>
          </div>
          <div className="top_body">
            {
              top_items.map((top_item) => (top_item))
            }
          </div>
        </div>
    );
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_log_in: true,
      show_registration: false,
      token: null,
      rootUrl: 'http://143.244.205.59/api/',
      portfolio_name: "1",
      content: []
    }
  }

  render() {
    return (
        <div className="main_body">
          <div className="column_list main_center">
            <Header/>
            <div className="main_home">
              <div className="days_price">
                <span className="days_price_logo">Сегодняшние цены на криптовалюту по рыночной капитализации</span>
                <span className="days_price_data">
                        Глобальная капитализация рынка криптовалют составляет
                        <span className="blue_text"> ₽{56.39} тыс </span>
                        . Снижение за предыдущий день на <span className="blue_text">{1.14} %</span>.
                    </span>
              </div>
              <div className="header_tops">
                <Top label="Топ 1" item_data={[{name: "Пункт топа 1", value: 2}, {name: "Пункт топа 2", value: 1}]}/>
                <Top label="Топ 2"
                     item_data={[{name: "Что-то из топа", value: 56}, {name: "Что-то из топа 2", value: 48}]}/>
                <Top label="Топ 3"
                     item_data={[{name: "Здесь был Вася", value: 100500}, {name: "Здесь был Петя", value: 100550}]}/>
              </div>
              <div className="user_assets">
                <div className="user_assets_menu">
                  <div className="user_assets_menu_item_show">
                    <span className="top_head_text">Активы</span>
                  </div>
                  <div className="user_assets_menu_fill"/>
                </div>
                <div className="user_assets_data">
                  <AssetsInfo token={this.state.token} portfolioName={this.state.portfolio_name} mod={0}/>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
          <Modal show={this.state.show_log_in} onClose={() => null}>
            <Log_in
                onClose={() => null}
                registration={() => this.setState(
                    {
                      show_registration: true,
                      show_log_in: false,
                    })
                }
                onClick={() => {
                  this.setState({
                        show_log_in: false,
                      }
                  );
                  //this.getToken(login, password)
                }}
                tokenGet={(token) => this.setState({token: token})}
            />
          </Modal>
          <Modal show={this.state.show_registration} onClose={() => null}>
            <Registration
                onClick={
                  () => {
                    this.setState({
                      show_registration: false,
                    })
                    //this.addUser(login, password)
                  }
                }
                tokenGet={(token) => this.setState({token: token})}
            />
          </Modal>
        </div>

    );
  }
}

export default HomePage;
