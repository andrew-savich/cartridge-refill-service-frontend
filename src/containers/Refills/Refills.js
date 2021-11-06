import React, {useState, useEffect} from 'react';
import RefillService from '../../services/RefillService';
import Table from '../../components/Table/Table';
import { Button } from '../../components/Button/Button';
import { useHistory } from 'react-router';

const Refills = () => {
    const [refills, setRefills] = useState([]);
    
    const history = useHistory();
    const currentPath = history.location.pathname;

    useEffect(() => {
        const init = async () =>{
            const responseRefills = await RefillService.getRefills();
            const responseRefillsData = responseRefills.data;

            const tempRefills = [];

            responseRefillsData.forEach(entity => {
                const refill = {
                    id: entity.id,
                    date: entity.refillDate,
                    uniqueIdentify: entity.cartridge.uniqueIdentify,
                    client: entity.cartridge.client.name,
                    group: entity.cartridge.model.group.title,
                    model: entity.cartridge.model.title,
                    actualGrams: entity.actualGrams,
                    drum: entity.changedDrum,
                    pcr: entity.changedPcr,
                    magnet: entity.changedMagnet,
                    rekel: entity.changedRakel,
                    doser: entity.changedDoserBlade,
                    chip: entity.changedChip,
                    firmware: entity.changedFirmware,
                    comment: entity.comment,
                    refiller: entity.employee.login,
                    act: entity.isIssuedAct
                };
                tempRefills.push(refill);
            });
            
            setRefills(tempRefills);
            
        }

        init();

    }, []);

    const addRefillHandler = () => {
        history.push(currentPath + "/add");
    };



    return(
        <div className="container">
            <h2 className="text-center">Refills</h2>

            <Button className="btn btn-primary" onClick={addRefillHandler} title="Add refill" />

           { refills.length !== 0 ? <Table entities={refills} editEntityPath={"/sugar"} /> : <h3>Empty</h3> }

        </div>
    )
}

export default Refills;