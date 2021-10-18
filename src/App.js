import React from 'react'
import { Route, Switch } from 'react-router';
import { Navbar } from './components/Navbar/Navbar';
import CreateEditClient from './containers/Client/CreateEditClient';
import CreateEditEmployee from './containers/Employee/CreateEditEmployee';
import EmployeeList from './containers/Employee/EmployeeList';
import EntityList from './containers/EntityList/EntityList';
import GroupList from './containers/Group/GroupList';
import ClientService from './services/ClientService';
import EmployeeService from './services/EmployeeService';

function App() {
  return (
    <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={EmployeeList}></Route>
          
          <Route path="/employees" exact render={() => <EntityList entityName="Employee" getEntities={EmployeeService.getEmployees} /> } ></Route>
          <Route path="/employees/add" component={CreateEditEmployee}></Route>
          <Route path="/employees/edit/:id" component={CreateEditEmployee}></Route>

          <Route path="/clients" exact render={() => <EntityList entityName="Client" getEntities={ClientService.getClients} /> } ></Route>
          <Route path="/clients/add" component={CreateEditClient} ></Route>
          <Route path="/clients/edit/:id" component={CreateEditClient} ></Route>

          <Route path="/groups" component={GroupList}></Route>
          {/* <Route path="/add-client" component={CreateEditClient} ></Route>
          <Route path="/edit-client/:id" component={CreateEditClient} ></Route> */}
        </Switch>
    </div>
  );
}

export default App;