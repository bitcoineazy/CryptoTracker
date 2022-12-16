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

class UserDataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: ["Наименование", "Количество", "Цена", "Подъём 1", "Подъём 2", "Подъём 3", "Подъём 4"],
      content: [
        {name: "name1", count: 3, price: 80, up_1: 0.9, up_2: 0.14, up_3: 0.15, up_4: 0.20},
        {name: "name2", count: 4, price: 70, up_1: 0.1, up_2: 0.13, up_3: 0.16, up_4: 0.19},
        {name: "name3", count: 5, price: 60, up_1: 0.11, up_2: 0.12, up_3: 0.17, up_4: 0.18},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
        {name: "name X", count: 999, price: 999, up_1: 0.2, up_2: 0.2, up_3: 0.2, up_4: 0.2},
      ]
    }
  }


  render() {
    const content = []
    for (let i = 0; i < this.state.content.length; i++) {
      let line = this.state.content[i]
      content.push(
          <div className="user_assets_data_grid_box-content user_assets_data_grid_box-content-start">
            <img src="free-icon-star-1828970.png"/>
            <p> {i+1} </p>
            <img src="./free-icon-star-1828970.png"/>
            <p> {line.name} </p>

          </div>
      )
      content.push(
          <div className="user_assets_data_grid_box-content-end">
            <div>{line.count}</div>

          </div>
      )
      content.push(
          <div className="user_assets_data_grid_box-content-end">
            <div>{line.price}</div>
          </div>
      )
      content.push(
          <div className="user_assets_data_grid_box-content-end user_assets_up">
            <div>{line.up_1}</div>
          </div>
      )
      content.push(
          <div className="user_assets_data_grid_box-content-end user_assets_up">
            <div>{line.up_2}</div>
          </div>
      )
      content.push(
          <div className="user_assets_data_grid_box-content-end user_assets_up">
            <div>{line.up_3}</div>
          </div>
      )
      content.push(
          <div className="user_assets_data_grid_box-content-end user_assets_up">
            <div>{line.up_4} </div>
          </div>
      )
    }
    return (
        <div className="user_assets_data_grid">
          {
            this.state.headers.map(
                (header) => (
                    <div className="user_assets_data_grid_box-header">
                      <div style={{border: 1}}>{header}</div>
                    </div>
                )
            )
          }
          {content}
        </div>
    );
  }
}

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
      login: null,
      password: null,
      token: null,
      rootUrl: 'http://143.244.205.59/api/',
      content: []
    }
  }

  getToken(username, password) {
    fetch(this.state.rootUrl + "api-token-auth/",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify({
            username,
            password
          })
        })
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                token: result.token,
              });
              this.getActives(result.token).then(r => null)
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error: error,
              });
            }
        )

  }

  result2content(result, assets_by_coin_id) {
    console.log(assets_by_coin_id);
    let content = [];
    let data = result.assets;
    console.log(data)
    let coin_id;
    let price;
    let symbol;
    let img;
    let price_change_24h;
    let price_change_percentage_24h;
    for (const row in data) {
      coin_id = data[row].asset;
      price = assets_by_coin_id[coin_id]['current_price'];
      symbol = assets_by_coin_id[coin_id].symbol;
      img = assets_by_coin_id[coin_id].image;
      price_change_24h = assets_by_coin_id[coin_id].price_change_24h;
      price_change_percentage_24h = assets_by_coin_id[coin_id].price_change_percentage_24h;
      content.push(
          {
            name: assets_by_coin_id[coin_id].name,
            count: parseFloat(data[row].amount).toFixed(2),
            buy_price: parseFloat(price).toFixed(2),
            assets: [parseFloat(price * data[row].amount).toFixed(2), symbol.toUpperCase()],
            price: parseFloat(data[row].price).toFixed(2),
            up_down: [parseFloat(price_change_24h).toFixed(4), parseFloat(price_change_percentage_24h).toFixed(4)],
            img: img
          }
      );
    }
    this.setState({content: content})
  }

  async getActives(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var formData = new FormData();
    formData.append("name", "1");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    let result = await fetch("http://143.244.205.59/api/portfolio/get_portfolio/", requestOptions)
    result = await result.json();
    let assets = result.assets
    let assets_by_coin_id = {}
    for (const assetsKey in assets) {
      let coin_id = assets[assetsKey].asset
      if (!(coin_id in assets_by_coin_id)) {
        var formData1 = new FormData();
        formData1.append("coin_id", coin_id);

        var requestOptions = {
          method: 'POST',
          body: formData1,
          redirect: 'follow'
        };
        let assets_data = await fetch("http://143.244.205.59/api/assets/by_coin_id/", requestOptions)
        assets_by_coin_id[coin_id] = await assets_data.json()
      }

    }

    this.result2content(result, assets_by_coin_id)
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
                        <span className="blue_text">₽{56.39}T.</span>
                        Снижение за предыдущий день на <span className="blue_text">{1.14}%</span>
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
                    <span className="top_head_text">Портфель</span>
                  </div>
                  <div className="user_assets_menu_fill"/>
                </div>
                <div className="user_assets_data">
                  <AssetsInfo token={this.state.token} content={this.state.content}/>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
          <Modal show={this.state.show_log_in}>
            <Log_in
                registration={() => this.setState(
                    {
                      show_registration: true,
                      show_log_in: false,
                    })
                }
                onClick={(login, password) => {
                  this.setState({
                        show_log_in: false,
                        login: login,
                        password: password
                      }
                  );
                  this.getToken(login, password)
                }}/>
          </Modal>
          <Modal show={this.state.show_registration}>
            <Registration onClick={
              (login, password) => {
                this.setState({
                  'show_registration': false,
                  login: login,
                  password: password,
                })
                this.addUser(login, password)
              }
            }/>
          </Modal>
        </div>

    );
  }
}

export default HomePage;
