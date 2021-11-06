import React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar } from './components/Navbar/Navbar';
import CartridgeForm from './containers/CartridgeForm/CartridgeForm';
import ClientForm from './containers/ClientForm/ClientForm';
import EmployeeForm from './containers/EmployeeForm/EmployeeForm';
import EntityList from './containers/EntityList/EntityList';
import GroupForm from './containers/GroupForm/GroupForm';
import ModelForm from './containers/ModelForm/ModelForm';
import CartridgeService from './services/CartridgeService';
import ClientService from './services/ClientService';
import EmployeeService from './services/EmployeeService';
import GroupService from './services/GroupService';
import ModelService from './services/ModelService';
import Refills from './containers/Refills/Refills'
import RefillForm from './containers/RefillForm/RefillForm';

function App() {
  return (
    <div>
        <Navbar />
        <Switch>
          
          <Route path="/employees" exact render={() => <EntityList entityName="Employee" getEntities={EmployeeService.getEmployees} /> } ></Route>
          <Route path="/employees/add" component={EmployeeForm}></Route>
          <Route path="/employees/edit/:id" component={EmployeeForm}></Route>

          <Route path="/clients" exact render={() => <EntityList entityName="Client" getEntities={ClientService.getClients} /> } ></Route>
          <Route path="/clients/add" component={ClientForm} ></Route>
          <Route path="/clients/edit/:id" component={ClientForm} ></Route>

          <Route path="/groups" exact render={() => <EntityList entityName="Group" getEntities={GroupService.getGroups} /> } ></Route>
          <Route path="/groups/add" component={GroupForm} ></Route>
          <Route path="/groups/edit/:id" component={GroupForm} ></Route>

          <Route path="/models" exact render={() => <EntityList entityName="Model" getEntities={ModelService.getModels} specialFields={{group: "title"}}/> } ></Route>
          <Route path="/models/add" component={ModelForm} ></Route>
          <Route path="/models/edit/:id" component={ModelForm} ></Route>

          <Route path="/cartridges" exact render={() => <EntityList entityName="Cartridge" getEntities={CartridgeService.getCartridges} specialFields={{model: "title", client: "name"}}/> } ></Route>
          <Route path="/cartridges/add" component={CartridgeForm} ></Route>
          <Route path="/cartridges/edit/:id" component={CartridgeForm} ></Route>

          <Route path="/refills" exact component={Refills} ></Route>
          <Route path="/refills/add" exact component={RefillForm} ></Route>
         
        </Switch>
    </div>
  );
}

export default App;