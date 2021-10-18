import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee";

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }

    getEmployee() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/one');
    }

    getEmployeePositions(){
        return axios.get(EMPLOYEE_API_BASE_URL + '/positions');
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + '/create', employee);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/update/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/delete/' + employeeId);
    }
    

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/get/' + employeeId);
    }

}

export default new EmployeeService();