import React, { Component } from 'react'
import EmployeeService from '../../../services/EmployeeService';
import { checkInput } from '../../../utils/Validation';
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
                        minLength: 5,
                        maxLength: 30,
                        pattern: /^[a-z0-9_-]*$/
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
                        minLength: 5,
                        maxLength: 30,
                        pattern: /^[a-zA-Z0-9]*$/
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
                        minLength: 2,
                        maxLength: 30,
                        pattern: /^[а-яА-Яa-zA-Z]*$/
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
                        minLength: 2,
                        maxLength: 30,
                        pattern: /^[а-яА-Яa-zA-Z]*$/

                    }
                }
            },
            
            position: '',
            positions: [],
            isFormValid: false
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
                inputs[field].valid = true;
               }
               
            });

            this.setState({
                inputs,
                position: employee['position'],
                isFormValid: true
            });

        } else {
            this.setState({
                position: this.state.positions[0],

            })
        }

    }

    changeInputHandler = (event, name) => {
        const inputs = {...this.state.inputs};
        const input = { ...inputs[name] };

        input.value = event.target.value;
        input.touched = true;
        input.valid = checkInput(input.validation, input.value);

        inputs[name] = input;

        let isFormValid = true;

        Object.keys(inputs).forEach(itemName => {
            isFormValid = inputs[itemName].valid && isFormValid;
        });

        this.setState({
            inputs,
            isFormValid
        });
    
    }

    changeSelectHandler = event => {
        this.setState({position: event.target.value});
    }

    saveEmployee = async event => {
        event.preventDefault();

        const employee = {
            firstName: this.state.inputs.firstName.value,
            lastName: this.state.inputs.lastName.value,
            login: this.state.inputs.login.value,
            password: this.state.inputs.password.value,
            position: this.state.position
        }

        if (this.state.id) {
            try {
                await EmployeeService.updateEmployee(employee, this.state.id);
                this.props.history.push('/');
            } catch (error){
                alert(error.response.data);
            }

        } else {
            try {
                await EmployeeService.createEmployee(employee);
                this.props.history.push('/');
            } catch(error) {
                alert(error.response.data);
            }
            
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

                                <Button className="btn btn-success me-2" onClick={this.saveEmployee} title="Save" disabled={!this.state.isFormValid}/>
                                <Button className="btn btn-secondary" onClick={this.cancel.bind(this)} title="Cancel" />

                            </form>
                        
                        {
                            this.state.id ? <Button className="btn btn-danger w-100 mt-2" onClick={() => this.deleteEmployee(this.state.id)} title="Delete" />: null
                        }

                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
