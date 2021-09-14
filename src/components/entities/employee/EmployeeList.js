import React, { Component } from 'react'
import EmployeeService from '../../../services/EmployeeService';
import { Table } from '../../Table/Table';

export default class EmployeeList extends Component {
    constructor(props){
        super(props);

        this.state = {
            employees: [
                {
                id: '',
                firstName: '',
                lastName: '',
                login: '',
                password: '',
                position: ''
            }
            ]
        }
        this.addEmployeeHandler = this.addEmployeeHandler.bind(this);
    }



    state = {
        employees: []
    }

    componentDidMount(){
        EmployeeService.getEmployees().then(response => {
            this.setState( {employees: response.data} )
        });
    }

    addEmployeeHandler(){
       this.props.history.push('/add');
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Employees</h2>
                <button className="btn btn-primary" onClick={this.addEmployeeHandler}>Add Employee</button>
                <div className="row">
                    
                    <Table entities={this.state.employees} />
                   
                </div>
                
            </div>
        )
    }
}
