import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from "classname";
import UP from "../../icons/UP.svg";
import DOWN from "../../icons/DOWN.svg";

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


export default AssetsInfo;

