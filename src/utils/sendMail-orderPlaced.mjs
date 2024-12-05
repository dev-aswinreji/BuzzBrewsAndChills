
import nodemailer from 'nodemailer'

export const sendEmailForOrderPlaced = async (user, order) => {
    console.log(process.env.NODEMAILER_EMAIL);
    
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
        to: user.email,
        subject: "Order Confirmation",
        text: 'Order Confirmation',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Hi ${user.fullName},</h2>
                <p>Thank you for your order! Here are the details of your purchase:</p>
                <h3>Order ID: ${order[0].orderId}</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Product</th>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Category</th>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantity</th>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Original Price</th>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Discounted Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order[0].products.map(item => `
                            <tr>
                                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                                    ${item.name}
                                </td>
                                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.category}</td>
                                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.quantity}</td>
                                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.originalProductPrice.toFixed(2)}</td>
                                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.price.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h4>Shipping Address:</h4>
                <p>
                    ${order[0].address.name}<br>
                    ${order[0].address.homeAddress}<br>
                    ${order[0].address.city}, ${order[0].address.state}, ${order[0].address.country}<br>
                    Pincode: ${order[0].address.pincode}<br>
                    Phone: ${order[0].address.phoneNumber}
                </p>
                <p><strong>Total Price: $${order[0].totalPrice.toFixed(2)}</strong></p>
                <p>Payment Method: ${order[0].paymentMethod}</p>
                <p>Payment Status: ${order[0].paymentStatus}</p>
                <p>Order Date: ${new Date().toLocaleString()}</p>
                <br>
                <p>If you have any questions about your order, feel free to contact us.</p>
                <p>Thank you for shopping with us!</p>
                <br>
                <p>Best Regards,</p>
                <p>BuzzBrews and Chills Team</p>
            </div>
        `
    });


}