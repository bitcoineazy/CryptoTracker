import React from 'react'
import portfolio_img from "../../icons/portfolio_img_2.svg";

import className from "classname";
import projectAPI from "../../API/projectAPI";
import PropTypes from "prop-types";

export default class Portfolios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.projectAPI = new projectAPI();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((prevProps.token !== this.props.token && this.props.token !== null) || this.props.update) {
      console.log('token');
      this.projectAPI.getPortfolios(this.props.token).then(portfolios => {
        let data = [];
        let portfolio_cost = null;
        let graph = null;
        for (let portfolio of portfolios) {
          data.push({name: portfolio.name, total_cost: portfolio.portfolio_change_metrics.final_equity});
          if (portfolio.name === this.props.portfolioName) {
            portfolio_cost = portfolio.portfolio_change_metrics.final_equity;
            graph = portfolio.portfolio_historical_graph;
            if (Object.keys(graph).length === 0) {
              graph = {id: "Нет данных графика", "data": [{x: 1, y: 1}]}
            }
          }

        }
        data.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name == b.name) return 0;
          if (a.name < b.name) return -1;
        })
        console.log(graph)
        this.setState({data: data});
        this.props.update_done(portfolio_cost, graph)
      })
    }
  }


  render() {
    const portfolios_container = className({'column_list': true, 'portfolios_container': true})


    return (
        <div className={portfolios_container}>
          {this.state.data.map(
              (item) => (
                  <button
                      style={{
                        border: 0,
                        background: this.props.portfolioName === item.name ? "rgba(0,0,0,0.04)" : 'rgb(0,0,0,0)'
                      }}
                      onClick={
                        async () => {
                          let res = await this.projectAPI.getPortfolio(this.props.token, item.name)
                          console.log("Портфель");
                          let graph = res.portfolio_historical_graph;
                          if (Object.keys(graph).length === 0) {
                            graph = {id: "Нет данных графика", "data": [{x: 1, y: 1}]}
                          }
                          this.props.onClick(item.name, item.total_cost, graph)
                        }}
                      className="row_list user_portfolio_reference">
                    <img src={portfolio_img} alt="" style={{height: 25, width: 25}}/>
                    <div className="text_list">
                      <p className="bold_text portfolio_reference_text" style={{userSelect: "text"}}>
                        {item.name}
                      </p>
                      <p className="bold_text grey_text portfolio_reference_text_cost">
                        {item.total_cost.toFixed(2)}
                      </p>
                    </div>
                  </button>
              )
          )}
        </div>
    )
  }
}

Portfolios.propTypes = {
  token: PropTypes.string,
  update: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  update_done: PropTypes.func.isRequired
}
