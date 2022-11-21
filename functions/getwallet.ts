import { createClient } from "@supabase/supabase-js";

const bs58 = require('bs58');
const web3 = require("@solana/web3.js");
const supabase = createClient(process.env.REACT_APP_DB_URL!, process.env.REACT_APP_DB_KEY!);

// Our standard serverless handler function
exports.handler = async (event : any) => {
    // if (event.httpMethod !== "POST") {
    //     return { statusCode: 405, headers: {'access-control-allow-origin': '*'}, body: "Method Not Allowed" };
    // }
    // const params = JSON.parse(event.body);
    const params = event.queryStringParameters;

    console.log('getting wallet for user: ' + params.id);

    const { data, error } = await supabase
        .from('wallets')
        .select('id, pubkey')
        .eq('id', params.id)
    ;
    if (error !== null) { return {statusCode: 500, body: JSON.stringify(error)}; }

    if (data.length === 0) {
        console.log('No wallet, creating one...');
        let keypair = web3.Keypair.generate();
        let privkey = bs58.encode(keypair.secretKey)
        console.log('Pubkey is: ' + keypair.publicKey);

        const { error } = await supabase
            .from('wallets')
            .insert({id: params.id, pubkey: keypair.publicKey, privkey: privkey});
        if (error !== null) { return {statusCode: 500, body: JSON.stringify(error)}; }
        console.log('Privkey saved in cloud!');

        return {statusCode: 200, body: JSON.stringify({id: params.id, pubkey: keypair.publicKey}, null, 4)};
    } else {
        console.log('Found wallet: ' + data[0].pubkey);
        return {statusCode: 200, body: JSON.stringify(data[0], null, 4)};
    }
}
