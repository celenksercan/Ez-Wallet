import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {WalletContext} from "../App";
import {getTokenBalance} from "../tokens/TokenBalance";

export default function UsdcPanel() {
    let wallet = React.useContext(WalletContext);
    const [usdc, setUSDC] = useState<number|undefined>(undefined);

    const loadUsdc = async () => {
        console.log('Loading usdc...');
        setUSDC(await getTokenBalance(wallet.key));
    }

    useEffect(() => {
        loadUsdc();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='roundPanel flexColumn gap5'>
            <div>Your USDC balance is:</div>
            { usdc !== undefined ?
                <div className='flexColumn gap5' style={{height: '100px'}}>
                    <div className='flexRow' style={{marginBottom: '10px'}}>
                        <img alt='' title='USDC' height='40px' src='usdc-50.png'/>
                        <div style={{fontSize: '30px', fontWeight: 'bold'}}>{usdc.toFixed(2)}</div>
                    </div>
                    <Link to='/withdraw'><button className='blueButton'>Withdraw</button></Link>
                </div>
                :
                <div className='flexColumn gap5' style={{height: '100px'}}>
                    <div>loading...</div>
                </div>
            }

        </div>
    )
}
