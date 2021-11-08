import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import CartridgeService from '../../services/CartridgeService';
import RefillService from '../../services/RefillService';
import EmployeeService from '../../services/EmployeeService';
import { checkInput } from '../../utils/Validation';

const RefillForm = props => {
    const [refillId] = useState(props.match.params.id);
    const [isFormValid, setIsFormValid] = useState(false);
    
    const [form, setForm] = useState({
        uniqueIdentify: {
            value: '',
            type: 'text',
            label: 'Unique Identify',
            errorMessage: 'Type the correct Unique Identify',
            valid: false,
            touched: false,
            validation: {
                required: true,
                pattern: /^B\d{1,5}\b/
            }
        },
        client: {
            value: '',
            type: 'text',
            label: 'Client',
            errorMessage: 'Type the correct client',
            valid: false,
            touched: false,
            validation: {
                required: true,
                maxLength: 30,
            },
            disabled: true
        },
        group: {
            value: '',
            type: 'text',
            label: 'Group',
            errorMessage: 'Type the correct group',
            valid: false,
            touched: false,
            validation: {
                required: true,
            },
            disabled: true
        },
        model: {
            value: '',
            type: 'text',
            label: 'Model',
            errorMessage: 'Type the correct model',
            valid: false,
            touched: false,
            validation: {
                required: true,
            },
            disabled: true
        },
        actualGrams: {
            value: '',
            type: 'text',
            label: 'Actual Grams',
            errorMessage: 'Type the correct Actual Grams',
            valid: false,
            touched: false,
            validation: {
                required: false,
            }
        },
        comment: {
            value: '',
            type: 'text',
            label: 'Comment',
            errorMessage: 'Type the correct comment',
            valid: true,
            touched: false,
            validation: {
                required: false,
            }
        },
        drum: {
            value: false,
            type: "checkbox",
            label: 'Drum',
            inline: true,
            valid: true
        },
        pcr: {
            value: false,
            type: "checkbox",
            label: 'PCR',
            inline: true,
            valid: true
        },
        magnet: {
            value: false,
            type: "checkbox",
            label: 'Magnet',
            inline: true,
            valid: true
        },
        rakel: {
            value: false,
            type: "checkbox",
            label: 'Rakel',
            inline: true,
            valid: true
        },
        doser: {
            value: false,
            type: "checkbox",
            label: 'Doser Blade',
            inline: true,
            valid: true
        },
        chip: {
            value: false,
            type: "checkbox",
            label: 'Chip',
            inline: true,
            valid: true
        },
        firmware: {
            value: false,
            type: "checkbox",
            label: 'Firmware',
            inline: true,
            valid: true
        },
        act: {
            value: false,
            type: "checkbox",
            label: 'Act',
            inline: false,
            valid: true
        }
        
    });

    useEffect(() => {
        const init = async () => {
           if(refillId){
               const response = await RefillService.getRefillById(refillId);
               let refill = response.data;

               const inputs = {...form};
               
               Array.from(Object.keys(refill)).forEach((field) => {

                    if(inputs[field]){
                        inputs[field].value = refill[field];
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
                    disabled={input.disabled}
                    inline={input.inline}
                />
            )
        })
    };

    const changeInputHandler = async (event, name) => {
        const inputs = {...form};
        const input = { ...inputs[name] };

        if(event.target.type === "checkbox"){
            input.value = event.target.checked;
        } else {
            input.value = event.target.value;
            input.touched = true;
            input.valid = checkInput(input.validation, input.value);
        }

        if (name === "uniqueIdentify" && input.valid) {
            
            const responseCartridge = await CartridgeService.getCartridgeByUniqueIdentify(input.value);

            if(responseCartridge.data !== '') {
                const cartridge = responseCartridge.data;

                inputs.client.value = cartridge.client.name;
                inputs.group.value = cartridge.model.group.title;
                inputs.model.value = cartridge.model.title;
                inputs.actualGrams.value = cartridge.model.defaultGrams;
                
            } else {
                inputs.client.value = '';
                inputs.group.value = '';
                inputs.model.value = '';
                inputs.actualGrams.value = '';
            }
            
            inputs.client.valid = checkInput(inputs.client.validation, inputs.client.value);
            inputs.group.valid = checkInput(inputs.group.validation, inputs.group.value);
            inputs.model.valid = checkInput(inputs.model.validation, inputs.model.value);
            inputs.actualGrams.valid = checkInput(inputs.actualGrams.validation, inputs.actualGrams.value);
            
        }

        inputs[name] = input;

        let isFormValid = true;

        Object.keys(inputs).forEach(itemName => {
            isFormValid = inputs[itemName].valid && isFormValid;
        });

        setForm(inputs);
        setIsFormValid(isFormValid);
        
    };

    const saveRefill = async event => {
        event.preventDefault();

        const cartridgeEntity = (await CartridgeService.getCartridgeByUniqueIdentify(form.uniqueIdentify.value)).data;
        
        //hardcoe, have to be changed to current logined user
        const employeeEntity = (await EmployeeService.getEmployeeById(1)).data;

        const refill = {
            cartridge: cartridgeEntity,
            employee: employeeEntity,
            actualGrams: form.actualGrams.value,
            comment: form.comment.value,
            changedDrum: form.drum.value,
            changedPcr: form.pcr.value,
            changedMagnet: form.magnet.value,
            changedRakel: form.rakel.value,
            changedDoserBlade: form.doser.value,
            changedChip: form.chip.value,
            changedFirmware: form.firmware.value,
            isIssuedAct: form.act.value
        };

        console.log("sending refill: ", refill);

        if (refillId){
            try{
                await RefillService.updateRefill(refill, refillId);
                props.history.push('/refills');
            } catch(error){
                alert(error.response.data);
            }
        } else {
            try{
                await RefillService.createRefill(refill);
                props.history.push('/refills');
            } catch(error){
                alert(error.response.data);
            }
        } 
        
    };

    const cancel = () => {
        props.history.push('/refills');
    };

    // const deleteRefill = id => {
    //     RefillService.deleteRefill(id).then(() => {
    //         props.history.push('/refills');
    //     });
    // };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">{ refillId ? "Edit refill" : "Add refill" }</h3>

                        <form>

                            { renderInputs() }

                            <Button className="btn btn-success me-2" onClick={saveRefill} title="Save" disabled={!isFormValid}/>
                            <Button className="btn btn-secondary" onClick={cancel} title="Cancel" /> 

                        </form>

                        {/* { refillId ? <Button className="btn btn-danger w-100 mt-2" onClick={() => deleteRefill(refillId)} title="Delete" />: null } */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefillForm;