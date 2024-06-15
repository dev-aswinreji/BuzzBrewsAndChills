

export const user_contactGet = async (req, res) => {
    try {

        res.render('contact')

    } catch (error) {
        console.error(error, 'USER CONTACT GET')
    }
}

