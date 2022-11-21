import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_DB_URL!, process.env.REACT_APP_DB_KEY!);

// Our standard serverless handler function
exports.handler = async (event : any) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers: {'access-control-allow-origin': '*'}, body: "Method Not Allowed" };
    }
    const params = JSON.parse(event.body);

    console.log('processing withdrawel from: ' + params.sender);
    console.log('sending USDC amount: ' + params.amount + ' to wallet: ' + params.receiver);

    const { error } = await supabase
        .from('withdrawals')
        .insert({sender: params.sender, amount: params.amount, receiver: params.receiver, status: 'NEW'});
    if (error !== null) { return {statusCode: 500, body: JSON.stringify(error)}; }

    return {statusCode: 200, body: 'OK'};
}
