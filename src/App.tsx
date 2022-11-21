import React, {useState} from 'react';
import './App.css';
import {Link} from "react-router-dom";
import GoogleLogin from "react-google-login";

export interface Wallet {
    email: string | undefined,
    key: string | undefined,
}

// use testdata:
export const WalletContext = React.createContext<Wallet>({
    email: 'steve@murphy.name',
    key: 'Bs8d1udnZBQi5z4YJtBXkVyAianT3UznQLSzEM8d7sFk',
});

export default function App() {
    const [loginData, setLoginData] = useState(localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')!) : null);
    const [walletKey, setWalletKey] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);

    const handleLogin = async (googleData:any) => {
        console.log('handleLogin...');
        const data = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                    'Content-Type': 'application/json',
            },
        }).then(x => x.json());
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
    }

    const handleFailure = (result:any) => {
        if (result.error === 'popup_closed_by_user') {
            completeLogin();
        }
    }

    function completeLogin() {
        let data = {email: 'steve@murphy.name'};
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
        // test data
        setEmail('steve@murphy.name');
        setWalletKey('Bs8d1udnZBQi5z4YJtBXkVyAianT3UznQLSzEM8d7sFk');
    }

    function handleLogout() {
        localStorage.removeItem('loginData');
        setLoginData(null);
    }


    let wallet = {email: email, key: walletKey};

    return (
        <WalletContext.Provider value={wallet}>
            <div className="App">
                <div className='flexColumn'>
                    <div style={{fontSize: '25px'}}>
                        Welcome to EZ Wallet
                    </div>
                    <img alt='' height='150px' src='wallet.png'/>
                    <Link to='/help'>
                        <button className='blueButton'>Read the Help</button>
                    </Link>
                    <div>Your safe, secure digital wallet.</div>
                    { loginData ? (
                            <div className='flexColumn'>
                                <div>You are logged in {loginData.email}</div>
                                <Link to='/home'><button className='blueButton'>Go to my wallet</button></Link>
                                <button className='blueButton' onClick={handleLogout}>Log out</button>
                            </div>
                        )
                        :
                        <div className='flexColumn'>
                            <div>Log in with Google to get started</div>
                            <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
                                         buttonText="Log in with Google"
                                         onSuccess={handleLogin}
                                         onFailure={handleFailure}
                                         cookiePolicy={'single_host_origin'}>
                            </GoogleLogin>
                        </div>
                    }
                </div>
            </div>
        </WalletContext.Provider>
    );
}

