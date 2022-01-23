import Validator from "validator";
import maxLengths from './lengths.json';

const isEmpty = value => {
    return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);
}

export const validateSignUp = data => {
    let errors = {};
  
    data.signupFname = !isEmpty(data.signupFname) ? data.signupFname : "";
    data.signupEmail = !isEmpty(data.signupEmail) ? data.signupEmail : "";
    data.signupPassword = !isEmpty(data.signupPassword)
      ? data.signupPassword
      : "";
    data.signupConfirmPassword = !isEmpty(data.signupConfirmPassword)
      ? data.signupConfirmPassword
      : "";
  
    validateUserFirstName(errors, data, 'signupFname', 'signupFname');
    validateUserEmail(errors, data, 'signupEmail', 'signupEmail');
    validatePasswordFormation(errors, data, 'signupPassword', 'signupPassword');
    validateConfirmPassword(errors, data, 'signupConfirmPassword', 'signupConfirmPassword', 'signupPassword');
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  const validateUserFirstName = (errors, data, errorKey='signupFname', dataKey='signupFname') => {
    const { min, max } = maxLengths.userFirstName;
    console.log(data);
    if (!Validator.isLength(data[dataKey] || '', { min, max })) {
      errors[errorKey] = `First name must be of ${min} to ${max} characters`;
    }
  
    if (Validator.isEmpty(data[dataKey] || '')) {
      errors[errorKey] = "First name is required";
    }
  };
  
  const validateUserEmail = (errors, data, errorKey='signupEmail', dataKey='signupEmail') => {
    if (!Validator.isEmail(data[dataKey] || '')) {
      errors[errorKey] = "Email is invalid";
    }
    if (Validator.isEmpty(data[dataKey] || '')) {
      errors[errorKey] = "Email is required";
    }
  };

  const validatePasswordFormation = (errors, data, errorKey='signupPassword', dataKey='signupPassword') => {
    const { min, max } = maxLengths.password;
    if (!checkForSpecialChars(data[dataKey])) {
      errors[errorKey] = "Password must contain at least one special character";
    }
  
    if (!checkForNumbers(data[dataKey])) {
      errors[errorKey] = "Password must contain at least one digit from 0 to 9";
    }
  
    if (!checkSmallCase(data[dataKey])) {
      errors[errorKey] = "Password must contain at least one lowercase alphabet from a to z";
    }
  
    if (!checkUpperCase(data[dataKey])) {
      errors[errorKey] = "Password must contain at least one upper case alphabet from A to Z";
    }
  
    if (!Validator.isLength(data[dataKey] || '', { min, max })) {
      errors[errorKey] = `Password must be of ${min} to ${max} characters`;
    }
  
    if (Validator.isEmpty(data[dataKey] || '')) {
      errors[errorKey] = "Password is required";
    }
  };

  const validateConfirmPassword = (errors, data, errorKey='signupConfirmPassword', dataKey='signupConfirmPassword', dataKeyPassword='signupPassword') => {
    if (!Validator.equals(data[dataKeyPassword] || '', data[dataKey] || '')) {
      errors[errorKey] = "Confirm password does not match";
    }
    if (Validator.isEmpty(data[dataKey] || '')) {
      errors[errorKey] = "Confirm password is required";
    }
  };
  
const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
const checkForSpecialChars = (string) => {
    for(let i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return true
        }
    }
    return false;
}

const checkForNumbers = (string) => {
    const re = new RegExp(/\S*[0-9]+\S*/g);
    return re.test(string);
};

const checkSmallCase = (string) => {
    const re = new RegExp(/\S*[a-z]+\S*/g);
    return re.test(string);
};

const checkUpperCase = (string) => {
    const re = new RegExp(/\S*[A-Z]+\S*/g);
    return re.test(string);
};