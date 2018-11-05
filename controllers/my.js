import {Gun} from '../core/gun';
require('gun/sea');

export default [
    {
        method: 'GET',
        path: '/my',
        options: {
            auth: 'simple'
        },
        handler: async (request, h) => {
            
            try {
                // var SEA = Gun.SEA;
                // var pair = await SEA.pair();
                // console.log(pair);
                
                // var enc = await SEA.encrypt('hello self', pair);
                // var data = await SEA.sign(enc, pair);
                // console.log(data);
                // var msg = await SEA.verify(data, pair.pub);
                // console.log({msg});
                
                // var dec = await SEA.decrypt(msg, pair); // or use diffie-hellman for shared data between users (not documented yet, ask in chat for example)
                // var proof = await SEA.work(dec, pair);
                // var check = await SEA.work('hello self', pair);
                // console.log(dec);
                // console.log(proof === check);

                return h.response('Hello').state('data', { firstVisit: false });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    }
]