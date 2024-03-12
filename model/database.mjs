import mongoose from "mongoose";


async function connect() {

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/database')

            .then(() => {

                console.log('database connected successfully')
            })
            .catch((err) => {
                console.log('error caught', err)
            })

    } catch (error) {
        console.log(error.message)
    }

}

connect()

export default mongoose.connection



