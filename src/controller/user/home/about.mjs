export const user_aboutGet = async (req, res) => {
        try {

                res.render('about')

        } catch (error) {
                console.log(error, 'USER ABOUT GET');
        }

}


