

import otpGenerator from 'otp-generator'


export async function orderIdGenerator(){
    return otpGenerator.generate(12,{digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false})
}