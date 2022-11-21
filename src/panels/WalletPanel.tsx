import React, {useState} from "react";
import {WalletContext} from "../App";

export default function WalletPanel() {
    let wallet = React.useContext(WalletContext);
    const [copied, setCopied] = useState(false);

    function copyWalletKey() {
        setCopied(true);
        navigator.clipboard.writeText(wallet.key!);
    }

    return (
        <div className='roundPanel flexColumn gap5'>
            <div>Your wallet is:</div>
            {wallet.key ?
                <div className='flexColumn gap5'>
                    <div>{wallet.key.slice(0, 8) + '...' + wallet.key.slice(-8)}</div>
                    <div style={{height: '30px', marginTop: '5px'}}>
                        {copied ?
                            <div>Copied!</div> :
                            <button className='blueButton' onClick={copyWalletKey}>Copy</button>
                        }
                    </div>
                </div>
                :
                <div>loading...</div>
            }
        </div>
    );
}

