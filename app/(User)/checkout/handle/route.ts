import { NextRequest, NextResponse } from "next/server"
import { captureOrder, getCheckoutToken } from "../api/checkout";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";


type checkoutData = {
    checkout_token_id: string,
    body: {
        payment: {
            gateway: string,
            card: {
                number: number,
                expiry_month: number,
                expiry_year: number,
                postal_zip_code: number
            }
        },
        customer: {
            email: string,
            firstname: string,
            lastname: string,
        },
        shipping: {
            name: string,
            country: string,
            town_city: string,
            street: string,
        }
    }

};


export async function POST(res: NextRequest) {

    const data: FormData = await res.formData();


    let cart_id;

    const checkoutData = {
        checkout_token_id: "",
        body: {
            payment: {
                gateway: "",
                card: {
                    number: 0,
                    expiry_month: 0,
                    expiry_year: 0,
                    postal_zip_code: 0
                }
            },
            customer: {
                email: "",
                firstname: "",
                lastname: "",
            },
            shipping: {
                name: "Receive Address",
                country: "",
                town_city: "",
                street: "",
            }
        }

    };


    //Preparing body

    for (const entry of data.entries()) {

        const [key, value]
            : [key: string, value: FormDataEntryValue]
            = entry;


        if (key == "checkout_token_id") {
            checkoutData.checkout_token_id = String(value);
        }
        else if (key == "cart_id") {
            cart_id = String(value);
        }
        else if (key == "gateway") {
            checkoutData.body.payment.gateway = String(value);
        }
        else if (key.includes("card_")) {
            const tempKey = key.slice("card_".length);
            // @ts-ignore
            checkoutData.body.payment.card[tempKey] = +value;
        }
        else if (key.includes("customer_")) {
            const tempKey = key.slice("customer_".length);
            //@ts-ignore
            checkoutData.body.customer[tempKey] = String(value);

        }
        else if (key.includes("shipping_")) {
            const tempKey = key.slice("shipping_".length);
            //@ts-ignore
            checkoutData.body.shipping[tempKey] = String(value);
        }

    }

    const checkoutTokenPromise = getCheckoutToken(checkoutData.checkout_token_id);
    const reqPromise = captureOrder(checkoutData);



    const [checkoutToken, req] = await Promise.all([checkoutTokenPromise, reqPromise]);

    const reference = req.customer_reference.slice(req.customer_reference.indexOf('-') + 1);
    await sendEmail(checkoutData, checkoutToken, reference);

    return NextResponse.json(req);

}


const sendEmail = async (checkoutData: checkoutData, checkoutToken: CheckoutToken, reference: string) => {


    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);



    const items = checkoutToken.line_items.map(
        item => {
            return {
                name: item.name,
                quantity: item.quantity,
                price: item.price.formatted_with_symbol,
                //@ts-ignore -- outdated type..? check docs.
                total: item.line_total.formatted_with_symbol,
                //@ts-ignore
                permalink: item.permalink,
                //@ts-ignore
                src: item.image ? item.image.url : `https://${process.env.SERVER_URL}/_next/image?url=%2Fimage.png&w=256&q=75`
            }
        }
    )

    //@ts-ignore
    const subtotal = checkoutToken.subtotal.formatted_with_symbol;

    const html = `<main>

    <center>

        <p>Your order (#${reference}) has been successful! Thank you for choosing us.
        <br/>Down below you can find your order details.</p>

        <h3>Order Details</h3>
        <h4>#${reference}</h4>

    </center>

    
    


    <center>
      <table>

          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>

      ${items.map(
        item =>
            `<tr>
                  <td>
                    <a
                        target=blank
                        href=${process.env.SERVER_URL}/product/${item.permalink}>
                        
                        <center>
                            <img
                                alt=${item.name}
                                src=${item.src} width=${50} height=${50}/>
                            <br/>
                            <span>${item.name}</span>
                        </center>

                    </a>
                  </td>

                  <td>${item.price}</td>
                  <td><center>${item.quantity}</center></td>
                  <td><center>${item.total}<center></td>

              </tr>`
    )}


        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <h4>
                  Subtotal ${subtotal}
              </h4>
            </td>
        </tr>

    </table>
    </center>




    </main>`

    const msg = {
        to: checkoutData.body.customer.email, // Change to your recipient
        from: process.env.SENDGRID_SENDER,
        subject: 'Order Confirmation',
        text: 'Your order has successfully been placed.',
        html: html,
    }

    sgMail
        .send(msg)
        .catch((error: any) => {
        })

}