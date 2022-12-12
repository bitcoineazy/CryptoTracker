import React from "react"
import "./personal_cabinet.css"
import styles from "./personal_cabinet.css"
import className from "classname"
import UP from "../../icons/UP.svg"
import DOWN from "../../icons/DOWN.svg"
import portfolio_img from "../../icons/portfolio_img.svg"
import add_portfolio from "../../icons/add_portfolio.svg"
import add_active from "../../icons/add_active.svg"

import { ResponsiveBump } from '@nivo/bump'

const MyResponsiveBump = ({ data /* see data tab */ }) => (
    <ResponsiveBump
        data={data}
        xPadding={0.5}
        colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={5}
        inactiveOpacity={0.15}
        startLabelPadding={15}
        startLabelTextColor={{ from: 'color', modifiers: [] }}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
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
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
    />
)


class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: ["Наименование", "Количество", "Цена за единицу", "Активы", "Ср. цена покупки", "Прибыль/Убыток"],
      content: [
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [-120, -0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09, "BTC"], buy_prise: 1200, up_down: [120, 0.15]},
      ]
    }
  }


  render() {
    const content = []
    for (let i = 0; i < this.state.content.length; i++) {
      let line = this.state.content[i]
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
            <p> {i + 1} </p>
            <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" style={{height: 50, width: 50}}/>
            <p> {line.name} </p>
          </div>,
          <div className="grid_box grid_column_box regular_text column_list">
            <div>{line.count}</div>
          </div>,
          <div className="grid_box grid_column_box regular_text column_list">
            <div>{line.prise}</div>
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
              <p>
                {line.assets[2]}
              </p>
            </div>
          </div>,
          <div className="grid_box grid_column_box regular_text column_list">
            <div>
              {"$ " + line.buy_prise}
            </div>
          </div>,
          <div className="column_list grid_box grid_column_box regular_text column_list">
            <div style={{paddingRight: 5}} >
              {line.up_down[0] === 0 ? null : line.up_down[0] > 0 ? "+" : "-"} $ { Math.abs(line.up_down[0])}
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
          {content}
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
    }
  }

  render() {
    const bodyClass = className({'body': true});
    const mainClass = className({'main': true});
    const portfoliosClass = className({'column_list': true, 'user_portfolios': true});
    const portfolioClass = className({'column_list': true, 'user_portfolios': true});
    const active_info_container = className({'column_list': true, 'active_info_container': true});
    const active_info = className({'space_between_column': true, 'active_info': true});
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
                  <div className="row_list button_active_add">
                    <div className="white_text button_active_add_icon">
                      <img src={add_active} style={{width:25, height:25}}/>
                    </div>
                    <p className="white_text button_active_add_text">
                      add new
                    </p>
                  </div>
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
                    <p className={graph_view_interval_option_0} onClick={() => this.setState({"history_interval": 0})}>
                      24 ч.
                    </p>
                    <p className={graph_view_interval_option_1} onClick={() => this.setState({"history_interval": 1})}>
                      7D
                    </p>
                    <p className={graph_view_interval_option_2} onClick={() => this.setState({"history_interval": 2})}>
                      30D
                    </p>
                    <p className={graph_view_interval_option_3} onClick={() => this.setState({"history_interval": 3})}>
                      90D
                    </p>
                    <p className={graph_view_interval_option_4} onClick={() => this.setState({"history_interval": 4})}>
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
                      },
                      {
                        "id": "Serie 2",
                        "data": [
                          {
                            "x": 2000,
                            "y": 3
                          },
                          {
                            "x": 2001,
                            "y": 8
                          },
                          {
                            "x": 2002,
                            "y": 11
                          },
                          {
                            "x": 2003,
                            "y": 4
                          },
                          {
                            "x": 2004,
                            "y": 7
                          }
                        ]
                      },
                      {
                        "id": "Serie 3",
                        "data": [
                          {
                            "x": 2000,
                            "y": 10
                          },
                          {
                            "x": 2001,
                            "y": 12
                          },
                          {
                            "x": 2002,
                            "y": 9
                          },
                          {
                            "x": 2003,
                            "y": 3
                          },
                          {
                            "x": 2004,
                            "y": 9
                          }
                        ]
                      },
                      {
                        "id": "Serie 4",
                        "data": [
                          {
                            "x": 2000,
                            "y": 7
                          },
                          {
                            "x": 2001,
                            "y": 7
                          },
                          {
                            "x": 2002,
                            "y": 4
                          },
                          {
                            "x": 2003,
                            "y": 2
                          },
                          {
                            "x": 2004,
                            "y": 10
                          }
                        ]
                      },
                      {
                        "id": "Serie 5",
                        "data": [
                          {
                            "x": 2000,
                            "y": 6
                          },
                          {
                            "x": 2001,
                            "y": 3
                          },
                          {
                            "x": 2002,
                            "y": 3
                          },
                          {
                            "x": 2003,
                            "y": 5
                          },
                          {
                            "x": 2004,
                            "y": 5
                          }
                        ]
                      },
                      {
                        "id": "Serie 6",
                        "data": [
                          {
                            "x": 2000,
                            "y": 2
                          },
                          {
                            "x": 2001,
                            "y": 4
                          },
                          {
                            "x": 2002,
                            "y": 6
                          },
                          {
                            "x": 2003,
                            "y": 10
                          },
                          {
                            "x": 2004,
                            "y": 12
                          }
                        ]
                      },
                      {
                        "id": "Serie 7",
                        "data": [
                          {
                            "x": 2000,
                            "y": 12
                          },
                          {
                            "x": 2001,
                            "y": 2
                          },
                          {
                            "x": 2002,
                            "y": 8
                          },
                          {
                            "x": 2003,
                            "y": 7
                          },
                          {
                            "x": 2004,
                            "y": 2
                          }
                        ]
                      },
                      {
                        "id": "Serie 8",
                        "data": [
                          {
                            "x": 2000,
                            "y": 11
                          },
                          {
                            "x": 2001,
                            "y": 11
                          },
                          {
                            "x": 2002,
                            "y": 1
                          },
                          {
                            "x": 2003,
                            "y": 1
                          },
                          {
                            "x": 2004,
                            "y": 4
                          }
                        ]
                      },
                      {
                        "id": "Serie 9",
                        "data": [
                          {
                            "x": 2000,
                            "y": 9
                          },
                          {
                            "x": 2001,
                            "y": 10
                          },
                          {
                            "x": 2002,
                            "y": 10
                          },
                          {
                            "x": 2003,
                            "y": 9
                          },
                          {
                            "x": 2004,
                            "y": 6
                          }
                        ]
                      },
                      {
                        "id": "Serie 10",
                        "data": [
                          {
                            "x": 2000,
                            "y": 5
                          },
                          {
                            "x": 2001,
                            "y": 1
                          },
                          {
                            "x": 2002,
                            "y": 12
                          },
                          {
                            "x": 2003,
                            "y": 8
                          },
                          {
                            "x": 2004,
                            "y": 1
                          }
                        ]
                      },
                      {
                        "id": "Serie 11",
                        "data": [
                          {
                            "x": 2000,
                            "y": 8
                          },
                          {
                            "x": 2001,
                            "y": 5
                          },
                          {
                            "x": 2002,
                            "y": 5
                          },
                          {
                            "x": 2003,
                            "y": 12
                          },
                          {
                            "x": 2004,
                            "y": 8
                          }
                        ]
                      },
                      {
                        "id": "Serie 12",
                        "data": [
                          {
                            "x": 2000,
                            "y": 4
                          },
                          {
                            "x": 2001,
                            "y": 6
                          },
                          {
                            "x": 2002,
                            "y": 7
                          },
                          {
                            "x": 2003,
                            "y": 11
                          },
                          {
                            "x": 2004,
                            "y": 11
                          }
                        ]
                      }
                    ]
                    }/>
                  </div>
                </div>
              </div>
              <AssetsInfo/>
            </div>
          </div>
          {
            //<Footer/>
          }
        </div>
    );
  }
}

export default UserPage;
