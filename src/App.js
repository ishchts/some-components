import _ from 'lodash';
import React from 'react';
import './App.scss';
import './loader.scss';
import axios from 'axios';

import Self from "./component/Self/Self";
import DataTable from "./component/Data-table/Data-table";
import { Route, Link } from "react-router-dom";



class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Self} />
        <Route path="/DataTable" component={DataTable} />
      </div>
    )
  }
}

export default App;
