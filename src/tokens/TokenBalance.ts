import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const web3 = require("@solana/web3.js");
const splToken = require('@solana/spl-token');
const usdcTokenAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const usdcTokenDecimals = 6;

global.Buffer = global.Buffer || require('buffer').Buffer;

export async function getTokenBalance(walletKey: string | undefined) {
    if (!walletKey) return;

    // token config
    const userPubkey = new PublicKey(walletKey);
    const tokenMintAddress = new PublicKey(usdcTokenAddress);

    // Connect to cluster
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);

    let userTokenAccount = await splToken.Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenMintAddress, userPubkey)
        .catch((reason :any) => { return {amount: BigInt(0)}; });

    let accountInfo = await new splToken.Token(connection, tokenMintAddress, TOKEN_PROGRAM_ID, null).getAccountInfo(userTokenAccount)
        .catch((reason :any) => { return {amount: BigInt(0)}; });

    return Number(accountInfo.amount.toString()) / Number(Math.pow(10, usdcTokenDecimals));
}
