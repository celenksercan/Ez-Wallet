import React, {useState} from 'react';
import '../App.css';
import {Link} from "react-router-dom";

export default function Help() {
    const [page, setPage] = useState(0);

    function nextPage() {
        setPage(page + 1);
    }

    return (
        <div className="App">
            <div className='flexColumn' style={{marginBottom: '15px'}}>
                <div className='flexRow'>
                    <img alt='' height='45px' src='wallet.png'/>
                    <div style={{fontSize: '25px'}}>EZ Wallet Help</div>
                </div>
            </div>
            { page === 0 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>How does EZ Wallet work?</div>
                    <div>
                        EZ Wallet is a free, digital wallet you can take
                        with you anywhere in the world.
                    </div>
                    <button className='blueButton' style={{marginTop: '15px'}} onClick={nextPage}>NEXT</button>
                </div>
            }
            { page === 1 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>Log in to your EZ wallet with your Google account.</div>
                    <div>It's completely free, and easy!</div>
                    <img alt='' height='50px' src='wallet.png'/>
                    <button className='blueButton' style={{marginTop: '15px'}} onClick={nextPage}>NEXT</button>
                </div>
            }
            { page === 2 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>Your EZ Wallet holds US Dollars.</div>
                    <div>Anyone can send "USDC" to your wallet address.</div>
                    <img alt='' height='50px' src='usdc-50.png'/>
                    <button className='blueButton' style={{marginTop: '15px'}} onClick={nextPage}>NEXT</button>
                </div>
            }
            { page === 3 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>To withdraw your USD, find a crypto dealer.</div>
                    <div>Arrange to exchange your USDC for cash, and agree on a fee (for example 3 percent).</div>
                    <button className='blueButton' style={{marginTop: '15px'}} onClick={nextPage}>NEXT</button>
                </div>
            }
            { page === 4 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>There is a 'Withdraw' button in EZ Wallet</div>
                    <div>Copy-paste the crypto dealer's wallet address here, enter an amount and click SEND.</div>
                    <button className='blueButton' style={{marginTop: '15px'}} onClick={nextPage}>NEXT</button>
                </div>
            }
            { page === 5 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>You can also receive notifications in EZ Wallet.</div>
                    <div>For example, notifications about your digital e-Identity or other important things.</div>
                    <button className='blueButton' style={{marginTop: '15px'}} onClick={nextPage}>NEXT</button>
                </div>
            }
            { page === 6 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>Here is some more information:</div>
                    <Link to='/privacy'>Our Privacy Policy</Link>
                    <Link to='/termsofservice'>Our Terms of Service</Link>
                    <button className='blueButton' style={{marginTop: '15px'}} onClick={nextPage}>NEXT</button>
                </div>
            }
            { page === 7 &&
                <div className='roundPanel width300 flexColumn'>
                    <div>Thanks for using EZ Wallet!</div>
                    <img alt='' height='75px' src='wallet.png'/>
                    <div>We hope you like it :)</div>
                    <Link to='/'><button className='blueButton' style={{marginTop: '15px'}}>OKAY</button></Link>
                </div>
            }
        </div>
    );
}
