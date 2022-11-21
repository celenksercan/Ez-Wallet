import React from 'react';
import '../App.css';
import {Link} from "react-router-dom";

export default function TermsOfService() {
    return (
        <div className="App">
            <div className='flexColumn' style={{marginBottom: '15px'}}>
                <div className='flexRow'>
                    <img alt='' height='45px' src='wallet.png'/>
                    <div style={{fontSize: '25px'}}>EZ Wallet Terms of Service</div>
                </div>
            </div>
            <div className='roundPanel width300 flexColumn'>
                <div>
                    EZ Wallet is provided for you free of charge.
                </div>
                <div>
                    We will create
                    a cloud wallet on the Solana blockchain for you, and manage the
                    functions for viewing your wallet balance and allowing you to
                    send USDC.
                </div>
                <div>
                    You can close your account at any time and receive
                    the private key to your wallet.
                </div>
                <Link to='/'>
                    <button className='blueButton' style={{marginTop: '15px'}}>OKAY</button>
                </Link>
            </div>
        </div>
    );
}
