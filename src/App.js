import React from 'react'
import { Route, Switch } from 'react-router';
import CreateEditEmployee from './components/entities/employee/CreateEditEmployee';
import EmployeeList from './components/entities/employee/EmployeeList';

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