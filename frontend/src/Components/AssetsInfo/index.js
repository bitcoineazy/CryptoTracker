import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from "classname";
import projectAPI from "../../API/projectAPI";

import UP from "../../icons/UP.svg";
import DOWN from "../../icons/DOWN.svg";

import './AssetsInfo.css'

class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: ["Наименование", "Количество", "Цена покупки", "Активы", "Текущая цена покупки", "Прибыль/Убыток"],
      isLoaded: false,
      error: null,
      content: [],

    }
    this.projectAPI = new projectAPI();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
        (
            prevProps.token !== this.props.token ||
            prevProps.portfolioName !== this.props.portfolioName ||
            this.props.update
        ) && this.props.mod === 0
    ) {
      this.projectAPI.getPortfolio(this.props.token, this.props.portfolioName).then(portfolio => {
        let coin_id = [];
        for (let portfolioElement of portfolio) {
          coin_id.push(portfolioElement.asset);
        }
        console.log("get coin_id - start");
        console.log(coin_id)
        console.log("get coin_id - end");
        this.projectAPI.getAssetsByCoinID(coin_id).then(assets => {
          let content = this.projectAPI.result2content(portfolio, assets)
          console.log(content)
          this.setState({content: content})
          this.props.update_done()
        })
      })
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
            <img src={line.img} style={{height: 50, width: 50}} alt=''/>
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
                      {(index == 0) ? header : header}
                    </div>
                )
            )
          }
          {
            //this.state.isLoaded ? this.state.error === null ? <div>Error</div> : content : <div>Loading...</div>
            content.map((item) => (
                item
            ))
          }
        </div>
    );
  }

}

AssetsInfo.propTypes = {
  token: PropTypes.string,
  portfolioName: PropTypes.string,
  mod: PropTypes.number,
}


export default AssetsInfo;

