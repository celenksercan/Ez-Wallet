import React, {useEffect, useState} from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import {WalletContext} from "../App";
import {getTokenBalance} from "../tokens/TokenBalance";

export default function Withdraw() {
    let wallet = React.useContext(WalletContext);
    const [usdc, setUSDC] = useState<number|undefined>(undefined);
    const [amount, setAmount] = useState<string>();
    const [receiver, setReceiver] = useState<string>();
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);



    const loadUsdc = async () => {
        console.log('Loading usdc...');
        setUSDC(await getTokenBalance(wallet.key));
    }

    useEffect(() => {
        loadUsdc();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function sendFunds() {
        console.log('Sending USDC ' + amount + ' to ' + receiver);
        setSending(true);
        let result = await fetch("/.netlify/functions/withdraw", {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                sender: wallet.key,
                amount: amount,
                receiver: receiver,
            })
        });
        if (result.ok) {
            setSuccess(true);
        } else {
            setError(true);
            console.log(result);
        }

    }

    return (
        <div className="App">
            <div className='flexColumn'>
                <div className='flexRow'>
                    <img alt='' height='45px' src='wallet.png'/>
                    <div style={{fontSize: '25px'}}>EZ Wallet Withdraw</div>
                </div>
                <div className='roundPanel flexColumn'>
                    <div>Your USDC balance is:</div>
                    {usdc !== undefined ?
                        <div className='flexColumn gap5' style={{height: '40px'}}>
                            <div className='flexRow' style={{marginBottom: '10px'}}>
                                <img alt='' title='USDC' height='40px' src='usdc-50.png'/>
                                <div style={{fontSize: '30px', fontWeight: 'bold'}}>{usdc.toFixed(2)}</div>
                            </div>
                        </div>
                        :
                        <div className='flexColumn gap5' style={{height: '40px'}}>
                            <div>loading...</div>
                        </div>
                    }
                    <div>Send to wallet:</div>
                    <input className='textInput' maxLength={45} onChange={(e) => setReceiver(e.target.value)}/>

                    <div>Amount to send:</div>
                    <div className='flexRow'>
                        <div style={{fontWeight: 'bold'}}>$</div>
                        <input className='textInput' maxLength={4} style={{width: '75px'}} onChange={(e) => setAmount(e.target.value)}/>
                    </div>

                    <div className='flexColumn' style={{height: '40px'}}>
                        {error ? <div style={{color: 'red'}}>Error!</div>
                            : success ? <div>SUCCESS</div>
                            : sending ? <div>Sending...</div>
                            : <button className='blueButton' style={{marginTop: '10px'}} onClick={sendFunds}>SEND</button>
                        }
                    </div>
                </div>
                <Link to='/home'>
                    <button className='blueButton'>CANCEL</button>
                </Link>
            </div>
        </div>
    );
}
