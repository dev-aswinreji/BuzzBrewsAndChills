import { insertUserQueriesAndMessages } from "../../../data/contact/insert.mjs"
import { contactCollection } from "../../../model/contact.mjs"


export const user_contactGet = async (req, res) => {
    try {

        res.render('contact')

    } catch (error) {
        console.error(error, 'USER CONTACT GET')
    }
}

export const user_contactPost = async (req,res)=>{
    try {
        
        const {name,email,subject,phoneNumber,message} = req.body

        const userQuery = {
            name:name,
            email:email,
            subject:subject,
            phoneNumber:phoneNumber,
            message:message
        }
        const contact = await insertUserQueriesAndMessages(userQuery)
        console.log(contact,'contact data is showing');
        res.redirect('/contact')
    } catch (error) {
        console.log(error,'CONTACT POST ERROR');
    }
}