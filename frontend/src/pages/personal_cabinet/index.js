import React from "react"
import "./styles.css"


class Portfolios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: "Портфель № x", total_cost: 1000},
        {name: "Портфель № x + 1", total_cost: 1200},
        {name: "Портфель № x + 1 asdaslkdhkjasdhlhaskhdasdasdansdkasdakdl", total_cost: 1200},
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
                      <div className="bold_text portfolio_reference_text">
                        {item.name}
                      </div>
                      <div className="bold_text grey_text portfolio_reference_text_cost">
                        {item.total_cost}
                      </div>
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

            Portfolio information
          </div>
        </div>
        {
          //<Footer/>
        }
      </div>
  );
}

export default UserPage;
