import React, { useState, useEffect } from 'react'
import EmployeeService from '../../services/EmployeeService';
import { checkInput } from '../../utils/Validation';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';


const CreateEditEmployee  = (props) => {
    const [employeeId] = useState(props.match.params.id);

    const [currentPosition, setCurrentPosition] = useState();
    const [positions, setPositions] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [form, setForm] = useState({
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
    });

    useEffect(() => {
        const init = async () => {

            const response = await EmployeeService.getEmployeePositions();
            setPositions(response.data);
            setCurrentPosition(response.data[0]);

            if (employeeId) {
                const response = await EmployeeService.getEmployeeById(employeeId);
                let employee = response.data;

                const inputs = { ...form };

                Array.from(Object.keys(employee)).forEach((field) => {

                    if (inputs[field]) {
                        inputs[field].value = employee[field];
                        inputs[field].valid = true;
                    }
                
                });

                setCurrentPosition(employee.position);
                setForm(inputs);
                setIsFormValid(true);

            }
        };            
       
        init();
    }, []);
    

    const changeInputHandler = (event, name) => {
        const inputs = {...form};
        const input = { ...inputs[name] };

        input.value = event.target.value;
        input.touched = true;
        input.valid = checkInput(input.validation, input.value);

        inputs[name] = input;

        let isFormValid = true;

        Object.keys(inputs).forEach(itemName => {
            isFormValid = inputs[itemName].valid && isFormValid;
        });

        setForm(inputs);
        setIsFormValid (isFormValid);
    
    }

    const changeSelectHandler = event => {
        setCurrentPosition(event.target.value);
    }

    const saveEmployee = async event => {
        event.preventDefault();

        const employee = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            login: form.login.value,
            password: form.password.value,
            position: currentPosition
        }

        if (employeeId) {
            try {
                await EmployeeService.updateEmployee(employee, employeeId);
                props.history.push('/');
            } catch (error){
                alert(error.response.data);
            }

        } else {
            try {
                await EmployeeService.createEmployee(employee);
                props.history.push('/');
            } catch(error) {
                alert(error.response.data);
            }
            
        }
        
    }

    const deleteEmployee = id => {
        EmployeeService.deleteEmployee(id).then(() => {
            props.history.push('/');
        });
    }

    const cancel = () => {
        props.history.push('/');
    }

    const renderInputs = () => {
        return Object.keys(form).map((inputName, index) => {
            const input = form[inputName];
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
                    onChange={(e) => changeInputHandler(e, inputName)}
                />

            )
        });
    }

    return (
        <div>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">{ employeeId ? 'Edit Employee' : 'Add Employee' }</h3>
                    <div className="card-body">

                        <form >

                            { renderInputs() }
                            
                            <Select
                                label="Position"
                                defaultValue={currentPosition}
                                onChange={(e) => changeSelectHandler(e)}
                                items={positions}
                            />

                            <Button className="btn btn-success me-2" onClick={saveEmployee} title="Save" disabled={!isFormValid}/>
                            <Button className="btn btn-secondary" onClick={cancel} title="Cancel" />

                        </form>
                    
                    {
                        employeeId ? <Button className="btn btn-danger w-100 mt-2" onClick={() => deleteEmployee(employeeId)} title="Delete" />: null
                    }

                    </div>
                </div>
            </div>
        </div>
        </div>
    )    
}

export default CreateEditEmployee
