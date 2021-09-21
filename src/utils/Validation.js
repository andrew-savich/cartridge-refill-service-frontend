export const checkInput = (validation, inputValue) => {

    if (!validation){
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = inputValue.trim() !== '' && isValid;
    }

    if (validation.minLength) {  
        isValid = inputValue.length >= validation.minLength && isValid;
    }

    if (validation.maxLength) {  
        isValid = inputValue.length <= validation.maxLength && isValid;
    }

    if (validation.pattern) {
        isValid = validation.pattern.test(inputValue) && isValid;
    }
    
     return isValid;
}

