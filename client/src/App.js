import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import axios from 'axios';
import _ from 'lodash';

let myData = [];

class App extends Component {

  state = {
    data: []
  }

  async componentDidMount() {
    myData = [];
    let res = await axios.get('/api/stocks');

    res.data.map(data => {
      myData.push([new Date(data['date']).getTime(), data['open']]);
    });
    console.log(myData);
    this.setState({data: myData})
  }

  render() {

    let config = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'NASDAQ Stock Price'
      },
      series: [{
        name: 'AAPL',
        data: this.state.data,
        tooltip: {
          valueDecimals: 2
        }
      }]
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ReactHighstock config={config} ref="chart" />
      </div>
    );
  }
}

export default App;
