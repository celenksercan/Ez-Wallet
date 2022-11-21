import { createClient } from "@supabase/supabase-js";
import {processWithdrawal} from "./withdraw-background";

const bs58 = require('bs58');
const web3 = require("@solana/web3.js");
const supabase = createClient(process.env.REACT_APP_DB_URL!, process.env.REACT_APP_DB_KEY!);

// Our standard serverless handler function
exports.handler = async (event : any) => {
    var { data, error } = await supabase.from('withdrawals').select('*').eq('id', 4);
    if (error !== null) { return {statusCode: 500, body: JSON.stringify(error)}; }
    if (!data) return;
    let withdrawal = data[0];
    console.log(withdrawal);

    try {
        processWithdrawal(withdrawal);
    } catch (e) {
        console.log(e);
    }

    return {statusCode: 200, body: 'OK'};
}