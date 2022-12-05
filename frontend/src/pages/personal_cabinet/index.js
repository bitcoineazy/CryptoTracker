import React from "react"
import "./styles.css"

class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: ["Наименование", "Количество", "Цена за единицу", "Активы", "Ср. цена покупки", "Прибыль/Убыток"],
      content: [
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
        {name: "name1", count: 3, prise: 80, assets: [1023, 0.09], buy_prise: 1200, up_down: [120, 0.15]},
      ]
    }
  }


  render() {
    const content = []
    for (let i = 0; i < this.state.content.length; i++) {
      let line = this.state.content[i]
      content.push(
          <div className="grid_box row_list bold_text grid_first_column">
            <img src=""/>
            <p> {i+1} </p>
            <img src=""/>
            <p> {line.name} </p>
          </div>,
          <div className="grid_box regular_text row_list">
            <div>{line.count}</div>
          </div>,
          <div className="grid_box regular_text row_list">
            <div>{line.prise}</div>
          </div>,
          <div className="grid_box regular_text row_list">
            <div>{line.assets}</div>
          </div>,
          <div className="grid_box regular_text row_list">
            <div>{line.buy_prise}</div>
          </div>,
          <div className="grid_box regular_text row_list">
            <div>{line.up_down}</div>
          </div>,
      )
    }
    return (
        <div className="actives_grid">
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
    return (
        <div className="column_list portfolios_container">
          {this.state.data.map(
              (item) => (
                  <div className="row_list user_portfolio_reference">
                    <div>
                      Img
                    </div>
                    <div className="text_list">
                      <p className="bold_text portfolio_reference_text">
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
          <div>
            Img
          </div>
          <div className="bold_text portfolio_reference_text">
            Add new Portfolio
          </div>

        </div>
    );
  }
}

const UserPage = () => {
  return (
      <div className="body">
        {
          //<Header/>
        }
        <div className="main">
          <div className="column_list user_portfolios">
            <Portfolios/>
            <AddPortfolio/>
          </div>
          <div className="column_list portfolio">
            <div className="column_list active_info_container">
              <div className="space_between_column active_info">
                <div className="column_list active_cost_container">
                  <div className="row_list active_cost">
                    <p className="bold_text active_cost_text">
                      $ 12,345.67
                    </p>
                    <div className="row_list green_background active_change_percent_container">
                      <div className="active_change_percent_status">
                        ^
                      </div>
                      <p className="white_text bold_text active_change_percent_text">
                        3.14%
                      </p>
                    </div>
                  </div>
                  <div className="row_list active_change_cost_container">
                    <p className="green_text bold_text active_change_cost_text">
                      + $ 2,718.28
                    </p>
                    <div className="active_change_cost_time_interval_container">
                      <p className="bold_text row_list grey_background active_change_cost_time_interval_text">
                        24h
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row_list button_active_add">
                  <div className="row_list white_text button_active_add_icon">
                    Img
                  </div>
                  <p className="white_text button_active_add_text">
                    add new
                  </p>
                </div>
              </div>
              <div className="space_between_column graph_control">
                <div className="row_list grey_background graph_type">
                  <p className="white_background bold_text graph_type_option">
                    График
                  </p>
                  <p className="bold_text graph_type_option">
                    Распределение
                  </p>
                  <p className="bold_text graph_type_option">
                    Статистика
                  </p>
                </div>
                <div className="row_list grey_background graph_view_interval">
                  <p className="white_background bold_text graph_view_interval_option">
                    24 ч.
                  </p>
                  <p className="bold_text graph_view_interval_option">
                    7D
                  </p>
                  <p className="bold_text graph_view_interval_option">
                    30D
                  </p>
                  <p className="bold_text graph_view_interval_option">
                    90D
                  </p>
                  <p className="bold_text graph_view_interval_option">
                    ALL
                  </p>
                </div>
              </div>
              <div className="graph">
                <div className="graph_img">
                  Img
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

export default UserPage;
