import React, { Component } from 'react'
import EmployeeService from '../../../services/EmployeeService';

export default class EmployeeList extends Component {
    constructor(props){
        super(props);

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then(response => {
            console.log('response: ', response.data);
            this.setState( {employees: response.data} )
        });
    }

    addEmployee(){
       this.props.history.push('/add');
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Employees</h2>
                <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                <div className="row">
                    
                    <table className="table table-striped table-hover ">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Login</th>
                                <th>Password</th>
                                <th>Position </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(employee => 
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.login}</td>
                                        <td>{employee.password}</td>
                                        <td>{employee.position}</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                   
                </div>
                
            </div>
        )
    }
}
