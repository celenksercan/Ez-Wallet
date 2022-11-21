import React from 'react';
import '../App.css';
import {Link} from "react-router-dom";

export default function Privacy() {
    return (
        <div className="App">
            <div className='flexColumn' style={{marginBottom: '15px'}}>
                <div className='flexRow'>
                    <img alt='' height='45px' src='wallet.png'/>
                    <div style={{fontSize: '25px'}}>EZ Wallet Privacy Policy</div>
                </div>
            </div>
            <div className='roundPanel width300 flexColumn'>
                <div>
                    EZ Wallet protects your privacy.
                </div>
                <div>
                    We only store information necessary
                    to verify your identity from your google account and manage a cloud
                    wallet on your behalf.
                </div>
                <div>
                    When receiving and transferring money with
                    any other party, you can remain anonymous.
                </div>
                <Link to='/'><button className='blueButton' style={{marginTop: '15px'}}>OKAY</button></Link>
            </div>
        </div>
    );
}
