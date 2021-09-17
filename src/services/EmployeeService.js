import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee";

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }

    getEmployeePositions(){
        return axios.get(EMPLOYEE_API_BASE_URL + '/positions');
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + '/create', employee);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee)
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }


}

export default new EmployeeService();