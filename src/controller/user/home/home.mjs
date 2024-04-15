export const user_homeGet = async (req, res) => {

    try {

        res.render('home')

    } catch (error) {
        console.error(error, 'USER HOME GET')
    }

}
