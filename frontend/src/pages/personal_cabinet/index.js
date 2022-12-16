import React from "react"
import * as PropTypes from "prop-types";
import className from "classname"
import {ResponsiveBump} from '@nivo/bump'

import "./personal_cabinet.css"
//import styles from "./personal_cabinet.css"

import UP from "../../icons/UP.svg"
import DOWN from "../../icons/DOWN.svg"
import portfolio_img from "../../icons/portfolio_img_2.svg"
import add_portfolio from "../../icons/add_portfolio.svg"
import add_active from "../../icons/add_active.svg"

import Modal from "../../Components/Modal/modal_window";
import Log_in from "../../Components/Log_in";
import Registration from "../../Components/Registration";
import Add_active from "../../Components/Add_active";

class MyResponsiveBump extends React.Component {
  render() {
    let {data /* see data tab */} = this.props;
    return (
        <ResponsiveBump
            data={data}
            xPadding={0.5}
            colors={{scheme: 'spectral'}}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={5}
            inactiveOpacity={0.15}
            startLabelPadding={15}
            startLabelTextColor={{from: 'color', modifiers: []}}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{theme: 'background'}}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{from: 'serie.color'}}
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: -36
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'ranking',
              legendPosition: 'middle',
              legendOffset: -40
            }}
            margin={{top: 40, right: 100, bottom: 40, left: 60}}
            axisRight={null}
        />
    );
  }
}

MyResponsiveBump.propTypes = {data: PropTypes.any}


class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: ["Наименование", "Количество", "Цена покупки", "Активы", "Текущая цена покупки", "Прибыль/Убыток"],
      content: [
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [-120, -0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [-120, -0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [120, -0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, price: 80, assets: [1023, 0.09, "BTC"], buy_price: 1200, up_down: [120, 0.15]},
      ],
      isLoaded: false,
      error: null,
    }
  }

  render() {
    const content = []
    for (let i = 0; i < this.props.content.length; i++) {
      let line = this.props.content[i]
      const active_change_percent_container = className(
          {
            'row_list': true,
            'active_change_percent_container': true,
            'green_background': line.up_down[1] > 0,
            'grey_background': line.up_down[1] === 0,
            'red_background': line.up_down[1] < 0,
          })
      const active_change_text = className({
        'padding-right: 5;': true,
        'white_text': true,
      })
      content.push(
          <div className="grid_first_column grid_box row_list bold_text">
            <img src={line.img} style={{height: 50, width: 50}}/>
            <p> {line.name} </p>
          </div>,
          <div className="grid_box grid_column_box regular_text column_list">
            <div>{line.count}</div>
          </div>,
          <div className="grid_box grid_column_box regular_text column_list">
            <div>{line.price}</div>
          </div>,
          <div className="grid_box grid_column_box regular_text column_list" style={{alignItems: "self-end"}}>
            <div className="row_list">
              <p className="">
                {"$ " + line.assets[0]}
              </p>
            </div>
            <div className="row_list" style={{gap: 5, alignItems: "self-start"}}>
              <p>
                {line.assets[1]}
              </p>
            </div>
          </div>,
          <div className="grid_box grid_column_box regular_text column_list">
            <div>
              {"$ " + line.buy_price}
            </div>
          </div>,
          <div className="column_list grid_box grid_column_box regular_text column_list">
            <div style={{paddingRight: 5}}>
              {line.up_down[0] === 0 ? null : line.up_down[0] > 0 ? "+" : "-"} $ {Math.abs(line.up_down[0])}
            </div>
            <div className={active_change_percent_container}>
              <div>
                {
                  line.up_down[1] !== 0 ?
                      <img src={line.up_down[1] > 0 ? UP : DOWN} alt=""
                           style={{height: 15, width: 15}}/> : null
                }
              </div>
              <div className={active_change_text}>
                {Math.abs(line.up_down[1])}
              </div>

            </div>
          </div>,
      )
    }
    return (
        <div className="actives_grid">
          {
            this.state.headers.map(
                (header, index) => (
                    <div className="bold_text grid_box grid_header">
                      {(index == 0) ? "# " + header : header}
                    </div>
                )
            )
          }
          {
            //this.state.isLoaded ? this.state.error === null ? <div>Error</div> : content : <div>Loading...</div>
            content
          }
        </div>
    );
  }

}

class Portfolios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: "Портфель № x", total_cost: 1000},
        {name: "Портфель № x + 1", total_cost: 1200},
        {name: "Портфель № x + 1 Очень длинное название", total_cost: 1200},
      ]
    }
  }

  render() {
    const portfolios_container = className({'column_list': true, 'portfolios_container': true})
    return (
        <div className={portfolios_container}>
          {this.state.data.map(
              (item) => (
                  <div className="row_list user_portfolio_reference">
                    <img src={portfolio_img} alt="" style={{height: 25, width: 25}}/>
                    <div className="text_list">
                      <p className="bold_text portfolio_reference_text" style={{userSelect: "text"}}>
                        {item.name}
                      </p>
                      <p className="bold_text grey_text portfolio_reference_text_cost">
                        {item.total_cost}
                      </p>
                    </div>
                  </div>
              )
          )}
        </div>
    )
  }
}

class AddPortfolio extends React.Component {
  render() {
    return (
        <div className="row_list add_portfolio_button">
          <img src={add_portfolio} alt="" style={{height: 25, width: 25}}/>
          <div className="bold_text portfolio_reference_text">
            Add new Portfolio
          </div>

        </div>
    );
  }
}

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active_cost: 12_345.6,
      active_change_percent: 3.14,
      active_change_cost: 2718.28,
      graph_type: 0,
      history_interval: 0,
      show_log_in: true,
      show_registration: false,
      show_add_active: false,
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

  addUser(username, password) {


  }


  render() {
    const bodyClass = className({'body': true});
    const mainClass = className({'main': true});
    const portfoliosClass = className({'column_list': true, 'user_portfolios': true});
    const portfolioClass = className({'column_list': true, 'user_portfolios': true});
    const active_info_container = className({'column_list': true, 'active_info_container': true});
    const active_info = className({'space_between_row': true, 'active_info': true});
    const active_cost_container = className({'column_list': true, 'active_cost_container': true});
    const active_cost = className({'row_list': true, 'active_cost': true});
    const active_cost_text = className({'bold_text': true, 'active_cost_text': true});
    const active_change_percent_container = className(
        {
          'row_list': true,
          'active_change_percent_container': true,
          'green_background': this.state.active_change_percent > 0,
          'grey_background': this.state.active_change_percent === 0,
          'red_background': this.state.active_change_percent < 0,
        });
    const active_change_cost_text = className(
        {
          'bold_text': true,
          'active_change_cost_text': true,
          'green_text': this.state.active_change_cost > 0,
          'grey_text': this.state.active_change_cost === 0,
          'red_text': this.state.active_change_cost < 0,
        });
    const graph = className({
      'graph_type_option': true,
      'bold_text': true,
      'white_background': this.state.graph_type === 0,
    });
    const normal_distribution = className({
      'graph_type_option': true,
      'bold_text': true,
      'white_background': this.state.graph_type === 1,
    });
    const statistic = className({
      'graph_type_option': true,
      'bold_text': true,
      'white_background': this.state.graph_type === 2,
    });
    const graph_view_interval_option_0 = className(
        {
          'graph_view_interval_option': true,
          'bold_text': true,
          'white_background': this.state.history_interval === 0,
        });
    const graph_view_interval_option_1 = className(
        {
          'graph_view_interval_option': true,
          'bold_text': true,
          'white_background': this.state.history_interval === 1,
        });
    const graph_view_interval_option_2 = className(
        {
          'graph_view_interval_option': true,
          'bold_text': true,
          'white_background': this.state.history_interval === 2,
        });
    const graph_view_interval_option_3 = className(
        {
          'graph_view_interval_option': true,
          'bold_text': true,
          'white_background': this.state.history_interval === 3,
        });
    const graph_view_interval_option_4 = className(
        {
          'graph_view_interval_option': true,
          'bold_text': true,
          'white_background': this.state.history_interval === 4,
        });


    return (
        <div className={bodyClass}>
          {
            //<Header/>
          }
          <div className={mainClass}>
            <div className={portfoliosClass}>
              <Portfolios/>
              <AddPortfolio/>
            </div>
            <div className={portfolioClass}>
              <div className={active_info_container}>
                <div className={active_info}>
                  <div className={active_cost_container}>
                    <div className={active_cost}>
                      <p className={active_cost_text}>
                        $ {this.state.active_cost}
                      </p>
                      <div className={active_change_percent_container}>
                        <div className="active_change_percent_status">
                          {
                            this.state.active_change_percent !== 0 ?
                                <img src={this.state.active_change_percent > 0 ? UP : DOWN} alt=""
                                     style={{height: 15, width: 15}}/> : null
                          }
                        </div>
                        <p className="white_text bold_text active_change_percent_text">
                          {Math.abs(this.state.active_change_percent)} %
                        </p>
                      </div>
                    </div>
                    <div className="row_list active_change_cost_container">
                      <p className={active_change_cost_text}>
                        {this.state.active_change_cost === 0 ? null : this.state.active_change_cost > 0 ? "+" : "-"} $ {Math.abs(this.state.active_change_cost)}
                      </p>
                      <div className="active_change_cost_time_interval_container">
                        <p className="bold_text row_list grey_background active_change_cost_time_interval_text">
                          24h
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="row_list button_active_add" onClick={() => {
                    this.setState({'show_add_active': true})
                  }}>
                    <div className="white_text button_active_add_icon">
                      <img src={add_active} style={{width: 25, height: 25}}/>
                    </div>
                    <p className="white_text button_active_add_text">
                      add new
                    </p>
                  </button>
                </div>
                <div className="space_between_row graph_control">
                  <div className="row_list grey_background graph_type">
                    <p className={graph} onClick={() => this.setState({"graph_type": 0})}>
                      График
                    </p>
                    <p className={normal_distribution} onClick={() => this.setState({"graph_type": 1})}>
                      Распределение
                    </p>
                    <p className={statistic} onClick={() => this.setState({"graph_type": 2})}>
                      Статистика
                    </p>
                  </div>
                  <div className="row_list grey_background graph_view_interval">
                    <p className={graph_view_interval_option_0}
                       onClick={() => this.setState({"history_interval": 0})}>
                      24 ч.
                    </p>
                    <p className={graph_view_interval_option_1}
                       onClick={() => this.setState({"history_interval": 1})}>
                      7D
                    </p>
                    <p className={graph_view_interval_option_2}
                       onClick={() => this.setState({"history_interval": 2})}>
                      30D
                    </p>
                    <p className={graph_view_interval_option_3}
                       onClick={() => this.setState({"history_interval": 3})}>
                      90D
                    </p>
                    <p className={graph_view_interval_option_4}
                       onClick={() => this.setState({"history_interval": 4})}>
                      ALL
                    </p>

                  </div>
                </div>
                <div className="graph">
                  <div className="graph_img">
                    <MyResponsiveBump data={[
                      {
                        "id": "Serie 1",
                        "data": [
                          {
                            "x": 2000,
                            "y": 1
                          },
                          {
                            "x": 2001,
                            "y": 9
                          },
                          {
                            "x": 2002,
                            "y": 2
                          },
                          {
                            "x": 2003,
                            "y": 6
                          },
                          {
                            "x": 2004,
                            "y": 3
                          }
                        ]
                      }
                    ]}/>
                  </div>
                </div>
              </div>
              {this.state.token}
              <AssetsInfo token={this.state.token} content={this.state.content}/>
            </div>
          </div>
          {
            //<Footer/>
          }
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
          <Modal onClose={
            () => this.setState({'show_add_active': false})
          }
                 show={this.state.show_add_active}>
            <Add_active cost={524} onClick={() => this.setState({'show_add_active': false})}
                        onClose={() => this.setState({'show_add_active': false})}/>
          </Modal>

        </div>
    );
  }
}

export default UserPage;
