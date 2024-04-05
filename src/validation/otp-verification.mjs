


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

