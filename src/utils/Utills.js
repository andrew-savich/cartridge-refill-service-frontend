    export const getColumnNamesFromEntityKeys = entity => {
        console.log("got entity to convert column names: ", entity);
        return Array.from(Object.keys(entity));
    }

    export const camelCaseToNormalWords = camelCaseString => {
        console.log("got camelCaseString: ", camelCaseString);
        return camelCaseString.replace(/([A-Z])/g, ' $1').replace(/^./, str =>  str.toUpperCase() );
    }