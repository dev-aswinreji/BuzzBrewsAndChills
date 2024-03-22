

export async function samePasswordValidation(password,confirmPassword) {
    if(password === confirmPassword){
        return true
    }
    else{
        return false
    }
}