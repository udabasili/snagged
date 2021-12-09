
/**
 *
 * Validate the registration form
 * @export {Function}
 * @param {String} key
 * @param {String} value
 * @param {Object} [otherProps=null]
 * @return {Object} isValid, error
 */
export function verifyForm (key, value, otherProps=null) {
    let isValid = true;
    let error = null
    switch(key){
        case 'email':
            if (!/^\S+@\S+\.\S+$/.test(value)){
                isValid = false
                error = 'Invalid email'
            }
            return  {isValid, error}
        case 'password':
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)) {
                isValid = false
                error = 'Password must be 8 or more characters and contain at least a number, a lowercase letter and an uppercase '
            }
            return { isValid, error }
        case 'confirmPassword':
            if (value !== otherProps.password) {
                isValid = false
                error = 'The two passwords must match '
            }
            return { isValid, error }        

        default:
            return {isValid, error};
    }
}