import otpGenerator from 'otp-generator'

export async function otpGenForNewUser(){
    return otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false})
}
export async function otpGenForForgotPassword(){
    return otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false})
}
