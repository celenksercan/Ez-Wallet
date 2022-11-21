import React from "react";
import {WalletContext} from "../App";

export default function IdentityPanel() {
    let wallet = React.useContext(WalletContext);
    return (
        <div className='roundPanel flexColumn gap5' style={{width: '300px'}}>
            <div>Your digital identity:</div>
            <div style={{fontSize: '15px'}}>When you receive a certified digital identity, it will be shown here</div>
        </div>
    )
}
