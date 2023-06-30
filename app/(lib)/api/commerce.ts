import CommerceSDK from '@chec/commerce.js';

export const commerce = new CommerceSDK("pk_test_530304959aba3f191ed92e60373ec97da4de0981b5798");


// const getCart = async()=>{
//     if (!(await commerce.cart.retrieve())){
//         await commerce.cart.refresh();
//     }
//     return await commerce.cart.retrieve()

// }

// const cart = await getCart();

