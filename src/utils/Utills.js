    export const getColumnNamesFromEntityKeys = entity => {
        return Array.from(Object.keys(entity));
    }

    export const camelCaseToNormalWords = camelCaseString => {
        return camelCaseString.replace(/([A-Z])/g, ' $1').replace(/^./, str =>  str.toUpperCase() );
    }