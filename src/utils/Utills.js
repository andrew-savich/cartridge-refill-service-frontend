class Utills {

    getColumnNamesFromEntityKeys(entity) {
       return Array.from(Object.keys(entity));
    }

    camelCaseToNormalWords(camelCaseString){
        return camelCaseString.replace(/([A-Z])/g, ' $1').replace(/^./, str =>  str.toUpperCase() );
    }

}

export default new Utills ();