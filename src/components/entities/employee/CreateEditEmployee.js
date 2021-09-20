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
            inputs: {
                login: {
                    value: '',
                    type: 'text',
                    label: 'Login',
                    errorMessage: 'Type the correct login',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Type the correct password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                },
                firstName: {
                    value: '',
                    type: 'text',
                    label: 'First Name',
                    errorMessage: 'Type the correct first name',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                },
                lastName: {
                    value: '',
                    type: 'text',
                    label: 'Last Name',
                    errorMessage: 'Type the correct last name',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            },
            
            position: '',
            positions: []
        }

        this.saveEmployee = this.saveEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);

    }

    async componentDidMount() {

        const response = await EmployeeService.getEmployeePositions();
        this.setState({positions: response.data});

        if (this.state.id) {
            const response = await EmployeeService.getEmployeeById(this.state.id);
            let employee = response.data;

            const inputs = { ...this.state.inputs };

            Array.from(Object.keys(employee)).forEach((field, index) => {

               if (inputs[field]) {
                inputs[field].value = employee[field];
               }
               
            });

            this.setState({
                inputs,
                position: employee['position']
            });

        } else {
            this.setState({
                position: this.state.positions[0],

            })
        }

    }

    validateInput(value, validation){
        if(!validation){
            return true;
        }

        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(validation.minLength){  
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    changeInputHandler = (event, name) => {
        const inputs = {...this.state.inputs};
        const input = { ...inputs[name] };

        input.value = event.target.value;
        input.touched = true;
        input.valid = this.validateInput(input.value, input.validation);

        inputs[name] = input;

        this.setState({
            inputs
        })
    
    }

    changeSelectHandler = event => {
        this.setState({position: event.target.value});
    }

    saveEmployee = event => {
        event.preventDefault();

        const employee = {
            firstName: this.state.inputs.firstName.value,
            lastName: this.state.inputs.lastName.value,
            login: this.state.inputs.login.value,
            password: this.state.inputs.password.value,
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

    renderInputs(){
        return Object.keys(this.state.inputs).map((inputName, index) => {
            const input = this.state.inputs[inputName];
            return(
                <Input 
                    key={inputName + index}
                    type={input.type}
                    value={input.value}
                    valid={input.valid}
                    touched={input.touched}
                    label={input.label}
                    shouldValidate={!!input.validation}
                    errorMessage={input.errorMessage}
                    onChange={(e) => this.changeInputHandler(e, inputName)}
                />

            )
        });
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

                                { this.renderInputs() }


                                <Select
                                    label="Position"
                                    defaultValue={this.state.position}
                                    onChange={(e) => this.changeSelectHandler(e)}
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
