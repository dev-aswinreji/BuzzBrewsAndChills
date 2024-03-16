import otpGenerator from 'otp-generator'

export async function otpGen(){
    return otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false})
}
