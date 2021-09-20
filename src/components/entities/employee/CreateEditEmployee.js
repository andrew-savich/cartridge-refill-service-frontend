import React, { Component } from 'react'
import EmployeeService from '../../../services/EmployeeService';
import { Button } from '../../UI/Button/Button';
import { Input } from '../../UI/Input/Input';
import { Select } from '../../UI/Select/Select';

export default class CreateEditEmployee extends Component {

    constructor(props){
        super(props);
        
        this.state={
            id: this.props.match.params.id,
            login: '',
            password: '',
            firstName: '',
            lastName: '',
            position: '',
            positions: []
        }

        this.saveEmployee = this.saveEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);

    }

    async componentDidMount() {

        const response = await EmployeeService.getEmployeePositions();
        this.setState({positions: response.data});
        console.log("positions1: ", this.state.positions);

        if(this.state.id){
            EmployeeService.getEmployeeById(this.state.id).then( response => {
                let employee = response.data;
                
                this.setState({
                    login: employee.login,
                    password: employee.password,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    position: employee.position,
                });
            });
        }else{
            this.setState({
                position: this.state.positions[0]
            })

            console.log("positions2: ", this.state.positions);
        } 

    }

    changeField = (event, name) => {
        const { value } = event.target;

        const setValuesMap = {
            'firstName': () => this.setState({firstName: value}),
            'lastName': () => this.setState({lastName: value}),
            'login': () => this.setState({login: value}),
            'password': () => this.setState({password: value}),
            'position': () => this.setState({position: value}),
        };
        
        setValuesMap[name]();
    }

    saveEmployee = event => {
        event.preventDefault();

        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            login: this.state.login,
            password: this.state.password,
            position: this.state.position
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

                            <form >
                                <Input 
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={(e) => this.changeField(e, 'firstName')}
                                    label="First name"
                                    errorMessage={'test validation'}
                                />
                                
                                <Input 
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={(e) => this.changeField(e, 'lastName')}
                                    label="Last name"
                                />

                                <Input 
                                    type="text"
                                    value={this.state.login}
                                    onChange={(e) => this.changeField(e, 'login')}
                                    label="Login"
                                />

                                <Input 
                                    type="password"
                                    value={this.state.password}
                                    onChange={(e) => this.changeField(e, 'password')}
                                    label="Password"
                                />

                                <Select
                                    label="Position"
                                    defaultValue={this.state.position}
                                    onChange={(e) => this.changeField(e, 'position')}
                                    items={this.state.positions}
                                />
                                

                                <Button className="btn btn-success mx-2" onClick={this.saveEmployee} title="Save" />
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
