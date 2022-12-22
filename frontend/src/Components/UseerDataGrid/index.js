import React from "react";

export default class UserDataGrid extends React.Component {
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
            <p> {i + 1} </p>
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
