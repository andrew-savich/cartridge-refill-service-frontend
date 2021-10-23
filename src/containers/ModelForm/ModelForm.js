import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import GroupService from '../../services/GroupService';
import ModelService from '../../services/ModelService';
import { checkInput } from '../../utils/Validation';

const ModelForm = props => {
    const [modelId] = useState(props.match.params.id);
    const [groups, setGroups] = useState([]);
    const [currentGroup, setCurrentGroup] = useState();
    const [groupSelects, setGroupSelects] = useState([]);
    const [currentGroupSelect, setCurrentGroupSelect] = useState();
    const [currentType, setCurrentType] = useState();
    const [types, setTypes] = useState([]);
    const [currentColor, setCurrentColor] = useState();
    const [colors, setColors] = useState([]);
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
        defaultGrams: {
            value: '',
            type: 'text',
            label: 'Default Grams',
            errorMessage: 'Type the correct default grams',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 0,
                maxLength: 5,
                pattern: /^\d+$/
            }
        },
        description: {
            value: '',
            type: 'text',
            label: 'Description',
            errorMessage: 'Type the correct description',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 0,
                maxLength: 400
            }
        }
    });

    useEffect(() => {
        const init = async () => {

            const colorsResponse = await ModelService.getModelColors();
            setColors(colorsResponse.data);
            setCurrentColor(colorsResponse.data[0]);

            const typeResponse = await ModelService.getModelTypes();
            setTypes(typeResponse.data);
            setCurrentType(typeResponse.data[0]);

            const groupsResponse = await GroupService.getGroups();
            const groupEntities = groupsResponse.data;

            setGroups(groupEntities);
            setCurrentGroup(groupEntities[0]);

            const groupTitles = [];

            groupEntities.forEach(group => {
                groupTitles.push(group.title);
            });

            setGroupSelects(groupTitles);
            setCurrentGroupSelect(groupTitles[0]);


            if (modelId) {
                const modelResponse = await ModelService.getModelById(modelId);
                let model = modelResponse.data;

                const inputs = { ...form };

                Array.from(Object.keys(model)).forEach((field) => {

                    if (inputs[field]) {
                        inputs[field].value = model[field];
                        inputs[field].valid = true;
                    }
                
                });

                setCurrentColor(model.color);
                setCurrentType(model.type);
                setCurrentGroup(model.group);
                setCurrentGroupSelect(model.group.title);
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

    const changeColorHandler = event => {
        setCurrentColor(event.target.value);
    }

    const changeGroupHandler = event => {
        setCurrentGroupSelect(event.target.value);
        
        const groupEntities = [ ...groups ];

        groupEntities.forEach(group => {
            if(group.title === event.target.value){
                setCurrentGroup(group);
            }
        });

    }

    const changeTypeHandler = event => {
        setCurrentType(event.target.value);
    }

    const saveModel = async event => {
        event.preventDefault();

        const model = {
            title: form.title.value,
            defaultGrams: form.defaultGrams.value,
            description: form.description.value,
            color: currentColor,
            type: currentType,
            group: currentGroup
        }

        console.log("model for request: ", model);

        if (modelId) {
            try {
                await ModelService.updateModel(model, modelId);
                props.history.push('/models');
            } catch (error){
                alert(error.response.data);
            }

        } else {
            try {
                await ModelService.createModel(model);
                props.history.push('/models');
            } catch(error) {
                alert(error.response.data);
            }
            
        }
        
    }

    const deleteModel = id => {
        ModelService.deleteModel(id).then(() => {
            props.history.push('/models');
        });
    }

    const cancel = () => {
        props.history.push('/models');
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
                        <h3 className="text-center">{ modelId ? 'Edit Model' : 'Add Model' }</h3>
                        <div className="card-body">

                            <form >

                            <Select
                                    label="Group"
                                    defaultValue={currentGroupSelect}
                                    onChange={(e) => changeGroupHandler(e)}
                                    items={groupSelects}
                                />

                                { renderInputs() }
                                
                                <Select
                                    label="Type"
                                    defaultValue={currentType}
                                    onChange={(e) => changeTypeHandler(e)}
                                    items={types}
                                />

                                <Select
                                    label="Color"
                                    defaultValue={currentType}
                                    onChange={(e) => changeColorHandler(e)}
                                    items={colors}
                                />

                                <Button className="btn btn-success me-2" onClick={saveModel} title="Save" disabled={!isFormValid}/>
                                <Button className="btn btn-secondary" onClick={cancel} title="Cancel" />

                            </form>
                        
                            { modelId ? <Button className="btn btn-danger w-100 mt-2" onClick={() => deleteModel(modelId)} title="Delete" />: null }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default ModelForm;