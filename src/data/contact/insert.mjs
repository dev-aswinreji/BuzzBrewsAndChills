import { contactCollection } from "../../model/contact.mjs";


export async function insertUserQueriesAndMessages (data){
    return await contactCollection.create(data)
}