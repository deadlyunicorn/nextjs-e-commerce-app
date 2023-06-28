import Commerce from '@chec/commerce.js';

const commerce = new Commerce('pk_test_530304959aba3f191ed92e60373ec97da4de0981b5798',true);

export const items = await commerce.products.list()
            .then(result=> result.data)


