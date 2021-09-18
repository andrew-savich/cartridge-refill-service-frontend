import React, { Component } from 'react'
import EmployeeService from '../../../services/EmployeeService';
import { Table } from '../../Table/Table';
import { Button } from '../../UI/Button/Button';

export default class EmployeeList extends Component {
    constructor(props){
        super(props);

       
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
                <Button className="btn btn-primary" onClick={this.addEmployeeHandler} title="Add Employee" />
                <div className="row">

                    {
                     this.state.employees.length !== 0 ? <Table entities={this.state.employees}/> : <h3>Empty</h3>
                    }
                   
                </div>
                
            </div>
        )
    }
}
