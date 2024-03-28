/** password validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function passwordValidator(input){

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(input)
}

/** email validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function emailValidator(input){

    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/
    return emailRegex.test(input)
}

/** username validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function usernameValidator(input){
    if(!input){
        return false
    }
    if(input.length>20){
        return false
    }
    return true
}



/** location validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function locationValidator(input){
    if(input.length>30 || input.length<0){
        return false
    }
    return true

}

/** phone Number validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function phoneNumberValidation(){
    const phoneRegex = /^([9]{1})([234789]{1})([0-9]{8})$/;
    return phoneRegex.test(phoneNumber);

}



export {passwordValidator,emailValidator,usernameValidator,phoneNumberValidation,locationValidator}
