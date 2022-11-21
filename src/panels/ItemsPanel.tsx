import React from "react";
import {WalletContext} from "../App";

export default function ItemsPanel() {
    let wallet = React.useContext(WalletContext);
    return (
        <div className='roundPanel flexColumn gap5' style={{width: '300px'}}>
            <div>Your Items and Services:</div>
            <div style={{fontSize: '15px'}}>When you receive items and services, they will be shown here</div>
        </div>
    )
}
