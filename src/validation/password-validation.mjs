

export async function passwordValidation () {
    
    const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/;

    return passwordRegex.test(password)
}