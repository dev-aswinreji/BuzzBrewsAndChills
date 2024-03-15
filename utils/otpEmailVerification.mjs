
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const sendEmail = async (email, full_name, otp) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        }
        
    }) 
    

    const info = await transporter.sendMail({
        from: '"BuzzBrews and Chills"<aswinreji9961849528@gmail.com>',
        to: email,
        subject: "Hello ",
        text: 'Hello world?',
        html: `<div>Hi ${full_name}<br/><p> your OTP is <br/><h3>${otp}<h3/><br/>Click the buttion to verify email <a href="${process.env.LINK}?token=${otp}">Click here </a></p></div>`
    })

}





