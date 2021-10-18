import React, {useState, useEffect} from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import GroupService from '../../services/GroupService';
import { checkInput } from '../../utils/Validation';

const GroupForm = props => {
    const [groupId] = useState(props.match.params.id);
    const [isFormValid, setIsFormValid] = useState(false);
    
    const [form, setForm] = useState({
        title: {
            value: '',
            type: 'text',
            label: 'Title',
            errorMessage: 'Type the correct title',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 2,
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
           if(groupId){
               const response = await GroupService.getGroupById(groupId);
               let group = response.data;

               const inputs = {...form};
               
               Array.from(Object.keys(group)).forEach((field) => {

                    if(inputs[field]){
                        inputs[field].value = group[field];
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

    const saveGroup = async event => {
        event.preventDefault();

        const group = {
            title: form.title.value,
            description: form.description.value
        };

        if (groupId){
            try{
                await GroupService.updateGroup(group, groupId);
                props.history.push('/groups');
            } catch(error){
                alert(error.response.data);
            }
        } else {
            try{
                await GroupService.createGroup(group);
                props.history.push('/groups');
            } catch(error){
                alert(error.response.data);
            }
        } 
        
    };

    const cancel = () => {
        props.history.push('/groups');
    };

    const deleteGroup = id => {
        GroupService.deleteGroup(id).then(() => {
            props.history.push('/groups');
        });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">{ groupId ? "Edit group" : "Add group" }</h3>

                        <form>
                            
                            { renderInputs() }

                            <Button className="btn btn-success me-2" onClick={saveGroup} title="Save" disabled={!isFormValid}/>
                            <Button className="btn btn-secondary" onClick={cancel} title="Cancel" />

                        </form>

                        { groupId ? <Button className="btn btn-danger w-100 mt-2" onClick={() => deleteGroup(groupId)} title="Delete" />: null }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupForm;