import React from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import WalletPanel from "../panels/WalletPanel";
import EmailPanel from "../panels/EmailPanel";
import UsdcPanel from "../panels/UsdcPanel";
import IdentityPanel from "../panels/IdentityPanel";
import ItemsPanel from "../panels/ItemsPanel";

export default function Home() {
    return (
        <div className="App">
            <div className='flexColumn'>
                <div className='flexRow'>
                    <img alt='' height='45px' src='wallet.png'/>
                    <div style={{fontSize: '25px'}}>EZ Wallet Home</div>
                </div>
                <EmailPanel/>
                <WalletPanel/>
                <UsdcPanel/>
                <IdentityPanel/>
                <ItemsPanel/>
                <Link to='/help'><button className='blueButton'>Read the Help</button></Link>
                <Link to='/'><button className='blueButton'>HOME</button></Link>
            </div>
        </div>
    );
}

