import React, { useEffect, useState } from 'react'
import { Input } from '../../components/Input/Input';
import ClientService from '../../services/ClientService';
import { checkInput } from '../../utils/Validation';
import { Button } from '../../components/Button/Button';

const CreateEditClient = props => {
    const [clientId] = useState(props.match.params.id);
    const [isFormValid, setIsFormValid] = useState(false);
    
    const [form, setForm] = useState({
        name: {
            value: '',
            type: 'text',
            label: 'Name',
            errorMessage: 'Type the correct name',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30
            }
        },
        contact: {
            value: '',
            type: 'text',
            label: 'Contact',
            errorMessage: 'Type the correct contact',
            valid: true,
            touched: false,
            validation: {
                required: false,
                maxLength: 30
            }
        },
        description: {
            value: '',
            type: 'text',
            label: 'Description',
            errorMessage: 'Type the correct description',
            valid: true,
            touched: false,
            validation: {
                required: false,
                maxLength: 400
            }
        }
    });

    useEffect(() => {
        const init = async () => {
           if(clientId){
               const response = await ClientService.getClientById(clientId);
               let client = response.data;

               const inputs = {...form};
               
               Array.from(Object.keys(client)).forEach((field) => {

                    if(inputs[field]){
                        inputs[field].value = client[field];
                        inputs[field].valid = true;
                    }

               });

               setForm(inputs);
               setIsFormValid(true);
           }
        };

        init();
    }, []);


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
        })
    };

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
    };

    const saveClient = async event => {
        event.preventDefault();

        const client = {
            name: form.name.value,
            contact: form.contact.value,
            description: form.description.value
        };

        if (clientId){
            try{
                await ClientService.updateClient(client, clientId);
                props.history.push('/clients');
            } catch(error){
                alert(error.response.data);
            }
        } else {
            try{
                await ClientService.createClient(client);
                props.history.push('/clients');
            } catch(error){
                alert(error.response.data);
            }
        } 
        
    };

    const cancel = () => {
        props.history.push('/clients');
    };

    const deleteClient = id => {
        ClientService.deleteClient(id).then(() => {
            props.history.push('/clients');
        });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">{ clientId ? "Edit client" : "Add client" }</h3>

                        <form>
                            
                            { renderInputs() }

                            <Button className="btn btn-success me-2" onClick={saveClient} title="Save" disabled={!isFormValid}/>
                            <Button className="btn btn-secondary" onClick={cancel} title="Cancel" />

                        </form>

                        { clientId ? <Button className="btn btn-danger w-100 mt-2" onClick={() => deleteClient(clientId)} title="Delete" />: null }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEditClient;