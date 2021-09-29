import React from 'react'
import { Route, Switch } from 'react-router';
import { Navbar } from './components/Navbar/Navbar';
import ClientList from './containers/Client/ClientList';
import CreateEditClient from './containers/Client/CreateEditClient';
import CreateEditEmployee from './containers/Employee/CreateEditEmployee';
import EmployeeList from './containers/Employee/EmployeeList';

function App() {
  return (
    <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={EmployeeList}></Route>
          <Route path="/employees" component={EmployeeList}></Route>
          <Route path="/add-employee" component={CreateEditEmployee}></Route>
          <Route path="/edit-employee/:id" component={CreateEditEmployee}></Route>
          <Route path="/clients" component={ClientList}></Route>
          <Route path="/add-client" component={CreateEditClient} ></Route>
          <Route path="/edit-client/:id" component={CreateEditClient} ></Route>
        </Switch>
    </div>
  );
}

export default App;