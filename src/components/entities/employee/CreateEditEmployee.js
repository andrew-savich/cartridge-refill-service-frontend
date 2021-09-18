import React, { Component } from 'react'
import EmployeeService from '../../../services/EmployeeService';
import { Button } from '../../UI/Button/Button';

export default class CreateEditEmployee extends Component {

    constructor(props){
        super(props);
        
        this.state={
            id: this.props.match.params.id,
            login: '',
            password: '',
            firstName: '',
            lastName: '',
            currentPosition: '',
            positions: []
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);

    }

    componentDidMount() {

        if(this.state.id){
            EmployeeService.getEmployeeById(this.state.id).then( response => {
                let employee = response.data;
                
                this.setState({
                    login: employee.login,
                    password: employee.password,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    currentPosition: employee.position,
                });
            });
        } 
            
        console.log('got id: ', this.state.id);
        EmployeeService.getEmployeePositions().then( response => {
            this.setState({positions: response.data});
        });

    }

    changeFirstNameHandler = event => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = event =>  {
        this.setState({lastName: event.target.value});
    }

    changeLoginHandler = event =>  {
        this.setState({login: event.target.value});
    }

    changePasswordHandler = event =>  {
        this.setState({password: event.target.value});
    }

    changePositionHandler = event =>  {
        this.setState({currentPosition: event.target.value});
    }

    saveEmployee = event => {
        event.preventDefault();

        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            login: this.state.login,
            password: this.state.password,
            position: this.state.currentPosition
        }

        if(this.state.id){
            EmployeeService.updateEmployee(employee, this.state.id).then(() => {
                this.props.history.push('/');
            });

        } else{
            EmployeeService.createEmployee(employee).then(() => {
                this.props.history.push('/');
            });
        }
        
    }

    deleteEmployee = id => {
        EmployeeService.deleteEmployee(id).then(() => {
            this.props.history.push('/');
        });
    }

    cancel = event => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">{ this.state.id ? 'Edit Employee' : 'Add Employee' }</h3>
                        <div className="card-body">

                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        placeholder="First name"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.firstName}
                                        onChange={this.changeFirstNameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.lastName}
                                        onChange={this.changeLastNameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Login</label>
                                    <input
                                        placeholder="Login"
                                        name="login"
                                        className="form-control"
                                        value={this.state.login}
                                        onChange={this.changeLoginHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.changePasswordHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Position</label>
                                    
                                    <select className="form-select" value={this.state.currentPosition} onChange={this.changePositionHandler}  >
                                        <option></option>
                                       {
                                           this.state.positions.map((position, index) => (
                                               <option
                                                key={index}
                                                value={position}
                                            >
                                                {position}
                                            </option>
                                            ))
                                       }
                                       <option >default</option>
                                    </select>

                                </div>

                                <Button className="btn btn-success" onClick={this.saveEmployee} title="Save" />
                                <Button className="btn btn-secondary" onClick={this.cancel.bind(this)} title="Cancel" />

                            </form>
                        
                        {
                            this.state.id ? <Button className="btn btn-danger w-100" onClick={() => this.deleteEmployee(this.state.id)} title="Delete" />: null
                        }

                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
