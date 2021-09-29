import React, { useState, useEffect } from 'react'
import EmployeeService from '../../services/EmployeeService';
import { Table } from '../../components/Table/Table';
import { Button } from '../../components/Button/Button';

 const EmployeeList = props => {
    const [employees, setEmployees] = useState([]);

    useEffect(()=>{
        const init = async () => {
            const response = await EmployeeService.getEmployees();
            setEmployees(response.data);
        };

        init();
    }, []);


    const addEmployeeHandler = () => {
       props.history.push('/add-employee');
    }

   
    return (
        <div className="container">
            <h2 className="text-center">Employees</h2>

            <Button className="btn btn-primary" onClick={addEmployeeHandler} title="Add Employee" />

            <div className="row">
                {
                    employees.length !== 0 ? <Table entities={employees}/> : <h3>Empty</h3>
                }
            </div>

        </div>
    )
    
}

export default EmployeeList;