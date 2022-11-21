import React from "react";
import {WalletContext} from "../App";

export default function EmailPanel() {
    let wallet = React.useContext(WalletContext);
    return (
        <div style={{marginBottom: '10px'}}>Welcome, {wallet.email}.</div>
    )
}
