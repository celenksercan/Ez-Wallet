import {PublicKey, Transaction, TransactionSignature} from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const web3 = require("@solana/web3.js");
const splToken = require('@solana/spl-token');
const bs58 = require('bs58');
const usdcTokenAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const usdcTokenDecimals = 6;

export async function sendTokens(sender: string, amount: number, receiver: string, privkey: string): Promise<string | undefined> {
    if (!sender) return Promise.resolve(undefined);
    if (!amount) return Promise.resolve(undefined);
    if (!receiver) return Promise.resolve(undefined);
    if (!privkey) return Promise.resolve(undefined);

    // token xfer
    const tokenMintAddress = new PublicKey(usdcTokenAddress);
    const senderPubkey = new PublicKey(sender);
    const receiverPubkey = new PublicKey(receiver);

    // Connect to cluster
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);

    console.log('sender splToken.getOrCreateAssociatedTokenAccount...');
    let senderTokenAccount = await splToken.Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenMintAddress, senderPubkey);
    console.log('sender token account: ' + senderTokenAccount.toBase58());

    console.log('receiver splToken.getOrCreateAssociatedTokenAccount...');
    let receiverTokenAccount = await splToken.Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenMintAddress, receiverPubkey);
    console.log('receiver token account: ' + receiverTokenAccount.toBase58());

    console.log('creating transaction...');
    let transaction = new Transaction({feePayer: senderPubkey, recentBlockhash: (await connection.getLatestBlockhash()).blockhash});

    // Add instructions to the tx
    transaction.add(
        splToken.Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            senderTokenAccount,
            receiverTokenAccount,
            senderPubkey,
            [],
            amount * Math.pow(10, usdcTokenDecimals),
        )
    );
    transaction.sign(web3.Keypair.fromSecretKey(bs58.decode(privkey)));

    console.log('sending transaction...');
    let signature = await connection.sendRawTransaction(transaction.serialize());
    console.log('signature: ' + signature);

    return signature;
}