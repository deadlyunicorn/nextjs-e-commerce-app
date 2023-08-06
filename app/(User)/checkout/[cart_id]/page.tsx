import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"
import { getCheckoutToken } from "../api/checkout";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { redirect } from "next/navigation";
import { CoolInput } from "@/app/(Shared)/components/CoolInput";
import "./checkout.css"
import { CoolButton } from "@/app/(Shared)/components/Global";
import { setCookie } from "../../(lib)/api/cookies";


const Checkout = async ({ params }: { params: { cart_id: string } }) => {

    const cart_id = params.cart_id;


    let res

    try {
        res = await getCheckoutToken(cart_id)
    }
    catch (err) {
        redirect('/');
    };

    const checkoutToken: CheckoutToken["id"] = res.id;
    const items: LineItem[] = res.line_items;

    items.length < 1 && redirect("/");

    const merchant = res.merchant;
    const shippingDetails = res.shipping_methods;

    return (
        <main className="flex flex-col justify-start min-h-[70vh] ">

            <div className="px-2 text-center">

                <h1 className="capitalize text-2xl">order summary</h1>
                <ul className="flex flex-col gap-2 w-full my-2 py-2 px-2 rounded-md bg-slate-200 dark:bg-slate-800">

                    <li className="grid grid-cols-4 place-items-center mb-4 text-lg">
                        <span className="col-span-2 place-self-start">Item Name</span>
                        <div className="grid xs:grid-cols-2 w-full">
                            <span >Price</span>
                            <span className="hidden xs:inline">Quantity</span>

                        </div>
                        <span >Total</span>

                    </li>
                    {items.map(
                        (item: LineItem) =>
                            <li
                                className="grid grid-cols-4 place-items-center "
                                key={item.id}>

                                <div
                                    className="
                            col-span-2 w-full">
                                    <Link
                                        target="_blank"
                                        className="hover:brightness-125 flex gap-x-2 items-center w-fit pr-2"
                                        href={`/product/${item.permalink}`}>

                                        <Image
                                            //@ts-ignore
                                            src={item.image.url}
                                            blurDataURL="/image.png"
                                            alt={item.name}
                                            className="aspect-square bg-white"
                                            height={50} width={50} />
                                        <span >{item.name}</span>
                                    </Link>



                                </div>

                                <div className="grid xs:grid-cols-2 place-items-center w-full">

                                    <span >{item.price.formatted_with_symbol}</span>
                                    <span>x{item.quantity}</span>

                                </div>
                                <span>{item.line_total.formatted_with_symbol}</span>

                            </li>


                    )}

                    <li className="grid grid-cols-4 text-xl">
                        <div className="
                            col-span-4
                            flex flex-col 
                            justify-self-end
                            ">
                            <div className="flex">
                                <span className="capitalize col-span-3 place-self-end pr-2">subtotal</span>
                                <span>{res.subtotal.formatted_with_symbol}</span>
                            </div>
                            <p className="capitalize text-xs">
                                Shipping price: {res.shipping.price.formatted_with_symbol}
                            </p>
                        </div>
                        
                    </li>
                </ul>
                

                <form
                    className="
                    py-2
                    px-2 
                    flex flex-col 
                    gap-y-4 
                    rounded-md
                    bg-slate-300
                    dark:bg-opacity-20 
                    dark:bg-black"
                    action={
						handleSubmit
						// "/checkout/loading"
						}>

                    <h1 className="text-2xl underline">Order Form</h1>

                    <input
                        readOnly
                        className="hidden" value={checkoutToken} name="checkout_token_id" />

                    <input readOnly
                        className="hidden" name="gateway" value={'test_gateway'} />

                    <div className="grid xs:grid-cols-2 justify-items-center">
                        <div className="flex items-center px-1">
                            <span>Email:</span>
                            <div className="">
                                <CoolInput>
                                    <input 
                                        placeholder="example@mail.com"
                                        type="email" name="email" />
                                </CoolInput>
                            </div>
                        </div>
                    </div>

                    <div className="grid xs:grid-cols-2 gap-x-2 gap-y-2 justify-items-center">

                        <div className="flex gap-x-1 items-center">
                            <span>Name:</span>
                            <div className="w-[50%]">

                                <CoolInput>
                                    <input 
                                        pattern="[a-zA-Z]+"
                                        minLength={3}
                                        placeholder="Your Name"
                                        type="text" name="firstName" />
                                </CoolInput>
                            </div>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <span>Surname:</span>
                            <div className="w-[50%]">
                                <CoolInput>
                                    <input
                                        pattern="[a-zA-Z]+"
                                        minLength={4}
                                        placeholder="Your Surname"
                                        type="text" name="lastName" />
                                </CoolInput>
                            </div>
                        </div>
                    </div>
                    <div className="grid xs:grid-cols-3 xs:place-items-center gap-y-2 gap-x-2">

                        <div className="flex w-[90%] gap-x-1">
                            <span>Country:</span>
                            {/* <CoolInput>
                                <input
                                    className=""
                                    list="countryList"
                                    pattern="[a-zA-Z]+"
                                    minLength={3}
                                    placeholder="Your Country"
                                    type="text" name="country" />
                            </CoolInput> */}

                            <CoolInput>

                                <select
                                    name="country">
                                    {countryListNumeric.map(
                                        entry=>
                                            <option 
                                                className="dark:bg-slate-950 bg-slate-300 text-center"
                                                key={entry.code}
                                                value={entry.code}>
                                                {entry.name}
                                            </option>
                                    )}

                                </select>
                            </CoolInput>

                        </div>
                        <div className="flex w-[70%] gap-x-1">
                            <span>City:</span>
                            <CoolInput>
                                <input 
                                    pattern="[a-zA-Z]+"
                                    minLength={4}
                                    placeholder="Your City"
                                    type="text" name="city" />
                            </CoolInput>
                        </div>
                        <div className="flex gap-x-1 items-center w-[70%]">
                            <span>Postcode:</span>
                            <CoolInput>
                                <input type="number"
                                    placeholder="XXX XX"
                                    min={10000} max={99999} name="postcode" />
                            </CoolInput>
                        </div>

                    </div>
                    <div className="grid xs:grid-cols-2 justify-items-center">
                        <div className="flex gap-x-1 items-center">
                            <span>Address:</span>
                            <CoolInput>
                                <input
                                    // pattern="/(?:[a-zA-Z]+\s)+[1-9][0-9]{0,2}/gm"
                                    minLength={4}
                                    placeholder="Address and number" 
                                    type="text" name="address" />
                            </CoolInput>
                        </div>
                    </div>
                    
                    <div className="grid xs:grid-cols-2 justify-items-center">
                        <div className="flex gap-x-1 items-center">
                            <span className="hidden xs:inline">Credit Card:</span>
                            <span className="xs:hidden">CC:</span>

                            <CoolInput>
                                <input 
                                    title="MasterCard is accepted."
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    name="cc" pattern="/^[5|4][0-9]{15}/gm" />
                            </CoolInput>
                        </div>
                    </div>

                    <div className="w-full">
                    <input 
                        className="
                        hover:underline 
                        text-lg 
                        cursor-pointer 
                        
                        dark:bg-slate-950
                        dark:hover:bg-slate-900

                        bg-slate-200
                        hover:bg-slate-100

                        rounded-md px-2 py-1
                        w-fit "
                        type="submit" />
                    </div>
                </form>

                {/* payment.card.token	string	optional	
For Stripe (Token API), the card token generated

->temp to stripe_pk*/}

                <div>
                    {/* {process.env.STRIPE_PK} */}
                </div>



            </div>




        </main>
    )
}

const handleSubmit = async()=>{
	await setCookie("cart_id","")
}

export const LinkNewTab = ({ children, href }: { children: ReactNode, href: string }) => (
    <Link href={href} target="_blank" tabIndex={0}>
        {children}
    </Link>
)

const countryListNumeric = [
    {code: 'AF', name: 'Afghanistan'},
		{code: 'AX', name: 'Åland Islands'},
		{code: 'AL', name: 'Albania'},
		{code: 'DZ', name: 'Algeria'},
		{code: 'AS', name: 'American Samoa'},
		{code: 'AD', name: 'Andorra'},
		{code: 'AO', name: 'Angola'},
		{code: 'AI', name: 'Anguilla'},
		{code: 'AQ', name: 'Antarctica'},
		{code: 'AG', name: 'Antigua and Barbuda'},
		{code: 'AR', name: 'Argentina'},
		{code: 'AM', name: 'Armenia'},
		{code: 'AW', name: 'Aruba'},
		{code: 'AU', name: 'Australia'},
		{code: 'AT', name: 'Austria'},
		{code: 'AZ', name: 'Azerbaijan'},
		{code: 'BS', name: 'Bahamas'},
		{code: 'BH', name: 'Bahrain'},
		{code: 'BD', name: 'Bangladesh'},
		{code: 'BB', name: 'Barbados'},
		{code: 'BY', name: 'Belarus'},
		{code: 'BE', name: 'Belgium'},
		{code: 'BZ', name: 'Belize'},
		{code: 'BJ', name: 'Benin'},
		{code: 'BM', name: 'Bermuda'},
		{code: 'BT', name: 'Bhutan'},
		{code: 'BO', name: 'Bolivia (Plurinational State of)'},
		{code: 'BQ', name: 'Bonaire, Sint Eustatius and Saba'},
		{code: 'BA', name: 'Bosnia and Herzegovina'},
		{code: 'BW', name: 'Botswana'},
		{code: 'BV', name: 'Bouvet Island'},
		{code: 'BR', name: 'Brazil'},
		{code: 'IO', name: 'British Indian Ocean Territory'},
		{code: 'BN', name: 'Brunei Darussalam'},
		{code: 'BG', name: 'Bulgaria'},
		{code: 'BF', name: 'Burkina Faso'},
		{code: 'BI', name: 'Burundi'},
		{code: 'CV', name: 'Cabo Verde'},
		{code: 'KH', name: 'Cambodia'},
		{code: 'CM', name: 'Cameroon'},
		{code: 'CA', name: 'Canada'},
		{code: 'KY', name: 'Cayman Islands'},
		{code: 'CF', name: 'Central African Republic'},
		{code: 'TD', name: 'Chad'},
		{code: 'CL', name: 'Chile'},
		{code: 'CN', name: 'China'},
		{code: 'CX', name: 'Christmas Island'},
		{code: 'CC', name: 'Cocos (Keeling) Islands'},
		{code: 'CO', name: 'Colombia'},
		{code: 'KM', name: 'Comoros'},
		{code: 'CG', name: 'Congo'},
		{code: 'CD', name: 'Congo (Democratic Republic of the)'},
		{code: 'CK', name: 'Cook Islands'},
		{code: 'CR', name: 'Costa Rica'},
		{code: 'CI', name: 'Côte d\'Ivoire'},
		{code: 'HR', name: 'Croatia'},
		{code: 'CU', name: 'Cuba'},
		{code: 'CW', name: 'Curaçao'},
		{code: 'CY', name: 'Cyprus'},
		{code: 'CZ', name: 'Czech Republic'},
		{code: 'DK', name: 'Denmark'},
		{code: 'DJ', name: 'Djibouti'},
		{code: 'DM', name: 'Dominica'},
		{code: 'DO', name: 'Dominican Republic'},
		{code: 'EC', name: 'Ecuador'},
		{code: 'EG', name: 'Egypt'},
		{code: 'SV', name: 'El Salvador'},
		{code: 'GQ', name: 'Equatorial Guinea'},
		{code: 'ER', name: 'Eritrea'},
		{code: 'EE', name: 'Estonia'},
		{code: 'ET', name: 'Ethiopia'},
		{code: 'FK', name: 'Falkland Islands (Malvinas)'},
		{code: 'FO', name: 'Faroe Islands'},
		{code: 'FJ', name: 'Fiji (Republic of)'},
		{code: 'FI', name: 'Finland'},
		{code: 'FR', name: 'France'},
		{code: 'GF', name: 'French Guiana'},
		{code: 'PF', name: 'French Polynesia'},
		{code: 'TF', name: 'French Southern Territories'},
		{code: 'GA', name: 'Gabon'},
		{code: 'GM', name: 'Gambia'},
		{code: 'GE', name: 'Georgia'},
		{code: 'DE', name: 'Germany'},
		{code: 'GH', name: 'Ghana'},
		{code: 'GI', name: 'Gibraltar'},
		{code: 'GR', name: 'Greece'},
		{code: 'GL', name: 'Greenland'},
		{code: 'GD', name: 'Grenada'},
		{code: 'GP', name: 'Guadeloupe'},
		{code: 'GU', name: 'Guam'},
		{code: 'GT', name: 'Guatemala'},
		{code: 'GG', name: 'Guernsey'},
		{code: 'GN', name: 'Guinea'},
		{code: 'GW', name: 'Guinea-Bissau'},
		{code: 'GY', name: 'Guyana'},
		{code: 'HT', name: 'Haiti'},
		{code: 'HM', name: 'Heard Island and McDonald Islands'},
		{code: 'VA', name: 'Holy See'},
		{code: 'HN', name: 'Honduras'},
		{code: 'HK', name: 'Hong Kong'},
		{code: 'HU', name: 'Hungary'},
		{code: 'IS', name: 'Iceland'},
		{code: 'IN', name: 'India'},
		{code: 'ID', name: 'Indonesia'},
		{code: 'IR', name: 'Iran (Islamic Republic of)'},
		{code: 'IQ', name: 'Iraq'},
		{code: 'IE', name: 'Ireland'},
		{code: 'IM', name: 'Isle of Man'},
		{code: 'IL', name: 'Israel'},
		{code: 'IT', name: 'Italy'},
		{code: 'JM', name: 'Jamaica'},
		{code: 'JP', name: 'Japan'},
		{code: 'JE', name: 'Jersey'},
		{code: 'JO', name: 'Jordan'},
		{code: 'KZ', name: 'Kazakhstan'},
		{code: 'KE', name: 'Kenya'},
		{code: 'KI', name: 'Kiribati'},
		{code: 'KP', name: 'Korea (Democratic People\'s Republic of)'},
		{code: 'KR', name: 'Korea (Republic of)'},
		{code: 'KW', name: 'Kuwait'},
		{code: 'KG', name: 'Kyrgyzstan'},
		{code: 'LA', name: 'Lao People\'s Democratic Republic'},
		{code: 'LV', name: 'Latvia'},
		{code: 'LB', name: 'Lebanon'},
		{code: 'LS', name: 'Lesotho'},
		{code: 'LR', name: 'Liberia'},
		{code: 'LY', name: 'Libya'},
		{code: 'LI', name: 'Liechtenstein'},
		{code: 'LT', name: 'Lithuania'},
		{code: 'LU', name: 'Luxembourg'},
		{code: 'MO', name: 'Macao'},
		{code: 'MK', name: 'Macedonia (the former Yugoslav Republic of)'},
		{code: 'MG', name: 'Madagascar'},
		{code: 'MW', name: 'Malawi'},
		{code: 'MY', name: 'Malaysia'},
		{code: 'MV', name: 'Maldives'},
		{code: 'ML', name: 'Mali'},
		{code: 'MT', name: 'Malta'},
		{code: 'MH', name: 'Marshall Islands'},
		{code: 'MQ', name: 'Martinique'},
		{code: 'MR', name: 'Mauritania'},
		{code: 'MU', name: 'Mauritius'},
		{code: 'YT', name: 'Mayotte'},
		{code: 'MX', name: 'Mexico'},
		{code: 'FM', name: 'Micronesia (Federated States of)'},
		{code: 'MD', name: 'Moldova (Republic of)'},
		{code: 'MC', name: 'Monaco'},
		{code: 'MN', name: 'Mongolia'},
		{code: 'ME', name: 'Montenegro'},
		{code: 'MS', name: 'Montserrat'},
		{code: 'MA', name: 'Morocco'},
		{code: 'MZ', name: 'Mozambique'},
		{code: 'MM', name: 'Myanmar'},
		{code: 'NA', name: 'Namibia'},
		{code: 'NR', name: 'Nauru'},
		{code: 'NP', name: 'Nepal'},
		{code: 'NL', name: 'Netherlands'},
		{code: 'NC', name: 'New Caledonia'},
		{code: 'NZ', name: 'New Zealand'},
		{code: 'NI', name: 'Nicaragua'},
		{code: 'NE', name: 'Niger'},
		{code: 'NG', name: 'Nigeria'},
		{code: 'NU', name: 'Niue'},
		{code: 'NF', name: 'Norfolk Island'},
		{code: 'MP', name: 'Northern Mariana Islands'},
		{code: 'NO', name: 'Norway'},
		{code: 'OM', name: 'Oman'},
		{code: 'PK', name: 'Pakistan'},
		{code: 'PW', name: 'Palau'},
		{code: 'PS', name: 'Palestine, State of'},
		{code: 'PA', name: 'Panama'},
		{code: 'PG', name: 'Papua New Guinea'},
		{code: 'PY', name: 'Paraguay'},
		{code: 'PE', name: 'Peru'},
		{code: 'PH', name: 'Philippines'},
		{code: 'PN', name: 'Pitcairn'},
		{code: 'PL', name: 'Poland'},
		{code: 'PT', name: 'Portugal'},
		{code: 'PR', name: 'Puerto Rico'},
		{code: 'QA', name: 'Qatar'},
		{code: 'RE', name: 'Réunion'},
		{code: 'RO', name: 'Romania'},
		{code: 'RU', name: 'Russian Federation'},
		{code: 'RW', name: 'Rwanda'},
		{code: 'BL', name: 'Saint Barthélemy'},
		{code: 'SH', name: 'Saint Helena, Ascension and Tristan da Cunha'},
		{code: 'KN', name: 'Saint Kitts and Nevis'},
		{code: 'LC', name: 'Saint Lucia'},
		{code: 'MF', name: 'Saint Martin (French part)'},
		{code: 'PM', name: 'Saint Pierre and Miquelon'},
		{code: 'VC', name: 'Saint Vincent and the Grenadines'},
		{code: 'WS', name: 'Samoa'},
		{code: 'SM', name: 'San Marino'},
		{code: 'ST', name: 'Sao Tome and Principe'},
		{code: 'SA', name: 'Saudi Arabia'},
		{code: 'SN', name: 'Senegal'},
		{code: 'RS', name: 'Serbia'},
		{code: 'SC', name: 'Seychelles'},
		{code: 'SL', name: 'Sierra Leone'},
		{code: 'SG', name: 'Singapore'},
		{code: 'SX', name: 'Sint Maarten (Dutch part)'},
		{code: 'SK', name: 'Slovakia'},
		{code: 'SI', name: 'Slovenia'},
		{code: 'SB', name: 'Solomon Islands'},
		{code: 'SO', name: 'Somalia'},
		{code: 'ZA', name: 'South Africa'},
		{code: 'GS', name: 'South Georgia and the South Sandwich Islands'},
		{code: 'SS', name: 'South Sudan'},
		{code: 'ES', name: 'Spain'},
		{code: 'LK', name: 'Sri Lanka'},
		{code: 'SD', name: 'Sudan'},
		{code: 'SR', name: 'Suriname'},
		{code: 'SJ', name: 'Svalbard and Jan Mayen'},
		{code: 'SZ', name: 'Swaziland'},
		{code: 'SE', name: 'Sweden'},
		{code: 'CH', name: 'Switzerland'},
		{code: 'SY', name: 'Syrian Arab Republic'},
		{code: 'TW', name: 'Taiwan, Province of China'},
		{code: 'TJ', name: 'Tajikistan'},
		{code: 'TZ', name: 'Tanzania, United Republic of'},
		{code: 'TH', name: 'Thailand'},
		{code: 'TL', name: 'Timor-Leste'},
		{code: 'TG', name: 'Togo'},
		{code: 'TK', name: 'Tokelau'},
		{code: 'TO', name: 'Tonga'},
		{code: 'TT', name: 'Trinidad and Tobago'},
		{code: 'TN', name: 'Tunisia'},
		{code: 'TR', name: 'Turkey'},
		{code: 'TM', name: 'Turkmenistan'},
		{code: 'TC', name: 'Turks and Caicos Islands'},
		{code: 'TV', name: 'Tuvalu'},
		{code: 'UG', name: 'Uganda'},
		{code: 'UA', name: 'Ukraine'},
		{code: 'AE', name: 'United Arab Emirates'},
		{code: 'GB', name: 'United Kingdom of Great Britain and Northern Ireland'},
		{code: 'US', name: 'United States of America'},
		{code: 'UM', name: 'United States Minor Outlying Islands'},
		{code: 'UY', name: 'Uruguay'},
		{code: 'UZ', name: 'Uzbekistan'},
		{code: 'VU', name: 'Vanuatu'},
		{code: 'VE', name: 'Venezuela (Bolivarian Republic of)'},
		{code: 'VN', name: 'Vietnam'},
		{code: 'VG', name: 'Virgin Islands (British)'},
		{code: 'VI', name: 'Virgin Islands (U.S.)'},
		{code: 'WF', name: 'Wallis and Futuna'},
		{code: 'EH', name: 'Western Sahara'},
		{code: 'YE', name: 'Yemen'},
		{code: 'ZM', name: 'Zambia'},
		{code: 'ZW', name: 'Zimbabwe'}
]

export default Checkout;

