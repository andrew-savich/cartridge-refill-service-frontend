import React, {useState, useEffect} from 'react';
import RefillService from '../../services/RefillService';
import Table from '../../components/Table/Table';

const Refills = () => {
    const [refills, setRefills] = useState([]);
    console.log("Refills was setted: ", refills);
    //const [refill, setRefill] = useState({});

    useEffect(() => {
        const init = async () =>{
            const responseRefills = await RefillService.getRefills();
            const responseRefillsData = responseRefills.data;
            console.log(responseRefillsData);

            const tempRefills = [];

            responseRefillsData.forEach(entity => {
                const refill = {
                    id: entity.id,
                    date: entity.refillDate,
                    client: entity.cartridge.client.name,
                    group: entity.cartridge.model.group.title,
                    model: entity.cartridge.model.title,
                    actualGrams: entity.actualGrams,
                    drum: entity.changedDrum,
                    pcr: entity.changedPcr,
                    magnet: entity.changedMagnet,
                    rekel: entity.changedRakel,
                    doser: entity.chngedDoserBlade,
                    chip: entity.changedChip,
                    firmware: entity.changedFirmware,
                    comment: entity.comment,
                    refiller: entity.employee.login,
                    act: entity.isIssuedAct
                };
                console.log("built refill entity: ", refill);
                tempRefills.push(refill);
            });
            console.log("built tempRefills: ", tempRefills);
            
            setRefills(tempRefills);
            
        }

        init();

    }, []);


    return(
        <div className="row">
                {
                   
                }
            </div>
    )
}

export default Refills;