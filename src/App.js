import React from 'react';
import './App.scss';
import './loader.scss';

import Self from "./component/Self/Self";
import DataTable from "./component/Data-table/Data-table";
import Basket from "./component/Basket";
import Multistepform from "./component/Multistepform";
import { Route } from "react-router-dom";



class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Self} />
        <Route path="/DataTable" component={DataTable} />
        <Route path="/Basket" component={Basket} />
      </div>
    )
  }
}

export default App;
