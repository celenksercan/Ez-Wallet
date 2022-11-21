import { Handler, schedule } from "@netlify/functions";
import {createClient} from "@supabase/supabase-js";
import {sendTokens} from "../lib/token-payments";

const supabase = createClient(process.env.REACT_APP_DB_URL!, process.env.REACT_APP_DB_KEY!);

// This is a scheduled cron job
const handler: Handler = async (event, context) => {
    console.log('Running background process...');

    var { data, error } = await supabase.from('withdrawals').select('*').eq('status', 'NEW');
    if (error !== null) { return {statusCode: 500, body: JSON.stringify(error)}; }

    let withdrawals = data;
    if (!withdrawals || withdrawals.length === 0) return;

    console.log('Processing ' + withdrawals.length + ' withdrawals with status: NEW');
    withdrawals.forEach(x => x.status = 'PROCESSING');
    var {error} = await supabase.from('withdrawals').upsert(withdrawals);
    if (error !== null) {
        console.log(error);
        return {statusCode: 500, body: JSON.stringify(error)};
    }

    for (const withdrawal of withdrawals) {
        await processWithdrawal(withdrawal);
    }

    return {statusCode: 200, body: JSON.stringify({ message: 'OKAY' })};
};

async function processWithdrawal(withdrawal: any) {
    console.log('processing withdrawal id: ' + withdrawal.id + ' for ' + withdrawal.sender);
    console.log('sending USDC ' + withdrawal.amount + ' to ' + withdrawal.receiver);

    let {data, error} = await supabase.from('wallets').select('*').eq('pubkey', withdrawal.sender).single();
    if (error !== null) {
        console.log(error);
        return;
    }
    let privkey = data.privkey;

    let signature = await sendTokens(withdrawal.sender, withdrawal.amount, withdrawal.receiver, privkey);
    if (signature) {
        console.log('Success');
        withdrawal.status = 'DONE';
        withdrawal.signature = signature;
        withdrawal.sent_at = new Date().toUTCString();
    } else {
        console.log('Failed');
        withdrawal.status = 'FAILED';
    }
    await supabase.from('withdrawals').upsert(withdrawal);
}

// cron job runs every minute
module.exports.handler = schedule("* * * * *", handler);
