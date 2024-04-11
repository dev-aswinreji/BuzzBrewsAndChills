


export async function  otpVerificationForUser(token_check, validateOTP) {
    try {
        if (token_check === validateOTP) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
export async function  otpVerificationForNewUser(token_check, validateOTP) {
    try {
        if (token_check === validateOTP) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
export async function  otpVerificationForForgotPasswordUser(token_check, validateOTP) {
    try {
        if (token_check === validateOTP) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}

