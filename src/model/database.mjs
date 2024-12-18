import mongoose from "mongoose";

async function connect() {

    try {

        await mongoose.connect(process.env.MONGO_URL)

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



