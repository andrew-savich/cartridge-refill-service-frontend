import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import CartridgeService from '../../services/CartridgeService';
import ClientService from '../../services/ClientService';
import ModelService from '../../services/ModelService';
import { checkInput } from '../../utils/Validation';

const CartridgeForm = props => {
    const [cartridgeId] = useState(props.match.params.id);
    const [models, setModels] = useState([]);
    const [currentModel, setCurrentModel] = useState();
    const [modelSelects, setModelSelects] = useState([]);
    const [currentModelSelect, setCurrentModelSelect] = useState();
    const [clients, setClients] = useState([]);
    const [currentClient, setCurrentClient] = useState();
    const [clientSelects, setClientSelects] = useState([]);
    const [currentClientSelect, setCurrentClientSelect] = useState();
    const [isFormValid, setIsFormValid] = useState(true);
    const [form, setForm] = useState({
        description: {
            value: '',
            type: 'text',
            label: 'Description',
            errorMessage: 'Type the correct description',
            valid: false,
            touched: false,
            validation: {
                required: false,
                maxLength: 400
            }
        }
    });

    useEffect(() => {
        const init = async () => {

            const modelsResponse = await ModelService.getModels();
            const modelEntities = modelsResponse.data;

            setModels(modelEntities);
            setCurrentModel(modelEntities[0]);

            const modelTitles = [];

            modelEntities.forEach(model => {
                modelTitles.push(model.title);
            });

            setModelSelects(modelTitles);
            setCurrentModelSelect(modelTitles[0]);

            const clientsResponse = await ClientService.getClients();
            const clientEntities = clientsResponse.data;

            setClients(clientEntities);
            setCurrentClient(clientEntities[0]);

            const clientTitles = [];

            clientEntities.forEach(client => {
                clientTitles.push(client.name);
            });

            setClientSelects(clientTitles);
            setCurrentClientSelect(clientTitles[0]);


            if (cartridgeId) {
                const cartridgeResponse = await CartridgeService.getCartridgeById(cartridgeId);
                const cartridge = cartridgeResponse.data;

                const inputs = { ...form };

                Array.from(Object.keys(cartridge)).forEach((field) => {

                    if (inputs[field]) {
                        inputs[field].value = cartridge[field];
                        inputs[field].valid = true;
                    }
                
                });

                setCurrentModel(cartridge.model);
                setCurrentModelSelect(cartridge.model.title);
                setCurrentClient(cartridge.client);
                setCurrentClientSelect(cartridge.client.name);
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

    const changeModelHandler = event => {
        setCurrentModelSelect(event.target.value);
        
        const modelEntities = [ ...models ];

        modelEntities.forEach(model => {
            if(model.title === event.target.value){
                setCurrentModel(model);
            }
        });

    }

    const changeClientHandler = event => {
        setCurrentClientSelect(event.target.value);
        
        const clientEntities = [ ...clients ];

        clientEntities.forEach(client => {
            if(client.name === event.target.value){
                setCurrentClient(client);
            }
        });

    }


    const saveCartridge = async event => {
        event.preventDefault();

        const cartridge = {
            description: form.description.value,
            model: currentModel,
            client: currentClient
        }

        console.log("cartridge for request: ", cartridge);

        if (cartridgeId) {
            try {
                await CartridgeService.updateCartridge(cartridge, cartridgeId);
                props.history.push('/cartridges');
            } catch (error){
                alert(error.response.data);
            }

        } else {
            try {
                await CartridgeService.createCartridge(cartridge);
                props.history.push('/cartridges');
            } catch(error) {
                alert(error.response.data);
            }
            
        }
        
    }

    const deleteCartridge = id => {
        CartridgeService.deleteCartridge(id).then(() => {
            props.history.push('/cartridges');
        });
    }

    const cancel = () => {
        props.history.push('/cartridges');
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
                        <h3 className="text-center">{ cartridgeId ? 'Edit Cartridge' : 'Add Cartridge' }</h3>
                        <div className="card-body">

                            <form >

                                <Select
                                    label="Client"
                                    defaultValue={currentClientSelect}
                                    onChange={(e) => changeClientHandler(e)}
                                    items={clientSelects}
                                />
                                <Select
                                    label="Model"
                                    defaultValue={currentModelSelect}
                                    onChange={(e) => changeModelHandler(e)}
                                    items={modelSelects}
                                />

                                { renderInputs() }

                                <Button className="btn btn-success me-2" onClick={saveCartridge} title="Save" disabled={!isFormValid}/>
                                <Button className="btn btn-secondary" onClick={cancel} title="Cancel" />

                            </form>
                        
                            { cartridgeId ? <Button className="btn btn-danger w-100 mt-2" onClick={() => deleteCartridge(cartridgeId)} title="Delete" />: null }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default CartridgeForm;