import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

async function connect() {

    try {

        await mongoose.connect(process.env.MONGO_DB)

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



