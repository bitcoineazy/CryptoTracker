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
import AssetsInfo from "../../Components/AssetsInfo";
import Portfolios from "../../Components/Portfilios";
import AddPortfolio from "../../Components/AddPortfolio";
import Footer from "../../Components/footer";
import Header from "../../Components/Header";

class MyResponsiveBump extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <ResponsiveBump
            data={this.props.data}
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


class AddPortfolioButton extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className="row_list add_portfolio_button">
          <img src={add_portfolio} alt="" style={{height: 25, width: 25}}/>
          <div className="portfolio_reference_text bold_text">
            <button className="portfolio_reference_text bold_text" style={{border: 0, background: "rgb(0,0,0,0)"}}
                    onClick={this.props.onClick}>
              Add new Portfolio
            </button>

          </div>

        </div>
    );
  }
}

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      portfolio_cost: 12_345.6,
      active_change_percent: 3.14,
      active_change_cost: 2718.28,
      graph_type: 0,
      history_interval: 0,
      graphData: {id: "main", "data": [{x: 1, y: 1}]},
      show_log_in: true,
      show_registration: false,
      show_add_active: false,
      show_add_portfolio: false,
      update_portfolio_list: false,
      update_active_list: false,
      rootUrl: 'http://143.244.205.59/api/',
      token: null,
      portfolio_name: "Портфель",
      content: [],
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.token !== null && prevState.token !== this.state.token) {

    }
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

          <div>
            <Header/>
            <div className={mainClass}>
              <div className={portfoliosClass}>
                <Portfolios
                    token={this.state.token}
                    update={this.state.update_portfolio_list}
                    update_done={(cost, dataGraph) => {
                      this.setState({update_portfolio_list: false});
                      this.setState({portfolio_cost: cost});
                      this.setState({graphData: dataGraph});
                    }}
                    onClick={
                      (name, cost, dataGraph) => {
                        this.setState({portfolio_name: name});
                        this.setState({portfolio_cost: cost});
                        this.setState({graphData: dataGraph});
                      }}
                    portfolioName={this.state.portfolio_name}
                />
                <AddPortfolioButton onClick={() => {
                  this.setState({show_add_portfolio: true})
                }}/>
              </div>
              <div className={portfolioClass}>
                <div className={active_info_container}>
                  <div className={active_info}>
                    <div className={active_cost_container}>
                      <div className={active_cost}>
                        <p className={active_cost_text}>
                          $ {this.state.portfolio_cost.toFixed(3)}
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
                        <img src={add_active} style={{width: 25, height: 25}} alt=''/>
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
                        this.state.graphData
                      ]}/>
                    </div>
                  </div>
                </div>
                {
                  //this.state.token
                }
                <AssetsInfo
                    token={this.state.token}
                    portfolioName={this.state.portfolio_name}
                    mod={0}
                    update={this.state.update_active_list}
                    update_done={() => this.setState({update_active_list: false})}
                />
                {
                  //this.state.AssetsInfo
                }

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
          <Modal
              onClose={() => this.setState({'show_add_active': false})}
              show={this.state.show_add_active}>
            <Add_active
                token={this.state.token}
                name={this.state.portfolio_name}
                cost={524}
                onClick={
                  () => {
                    this.setState({show_add_active: false});
                    this.setState({update_active_list: true});
                  }
                }
                onClose={() => this.setState({show_add_active: false})}

            />
          </Modal>
          <Modal
              onClose={() => this.setState({show_add_portfolio: false})}
              show={this.state.show_add_portfolio}>
            <AddPortfolio
                token={this.state.token}
                onClick={
                  () => {
                    this.setState({show_add_portfolio: false});
                    this.setState({update_portfolio_list: true});
                  }}
                onClose={() => this.setState({show_add_portfolio: false})}
            />
          </Modal>

        </div>
    );
  }
}

export default UserPage;
