import React from 'react'
import { Route, Switch } from 'react-router';
import CreateEditEmployee from './containers/Employee/CreateEditEmployee';
import EmployeeList from './containers/Employee/EmployeeList';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={EmployeeList}></Route>
        <Route path="/employees" component={EmployeeList}></Route>
        <Route path="/add" component={CreateEditEmployee}></Route>
        <Route path="/edit/:id" component={CreateEditEmployee}></Route>
      </Switch>
    </div>
  );
}

export default App;