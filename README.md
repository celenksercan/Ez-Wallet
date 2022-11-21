# EZ Wallet

An easy, free, portable digital wallet managed on the cloud.

Welcome! The problem we are trying to solve: provide a portable, safe,
secure wallet for displaced persons such as refugees.

The wallet should enable to person to support their digital rights
and participate in the digital society without discrimination.

EZ Wallet solves this problem:
* It's a free, easy to use digital wallet
* Private keys are managed in the cloud by EZ Wallet
* Therefore EZ Wallet is simple and easy to use

Key features:
* Anyone can create an EZ Wallet, it's free
* You only need a Google account to log in
* EZ Wallet can carry funds in USDC
* Users can withdraw their by transferring to a crypto dealer
* In future EZ Wallet can also contain tokens to represent digital identity

How does EZ Wallet work?

* User logs in with google account to 'EZ Wallet'
* EZ Wallet creates a cloud managed wallet on first login
* Users can see their wallet balance for USDC in EZ Wallet
* The 'Withdraw' function allows users to send USDC
* Transactions to send USDC are done by server-side backend
* The private keys are managed by EZ Wallet backend
* Security and authentication is via OAuth / google client id

All about keys - with the requirement to reduce complexity for the user,
EZ Wallet was designed as a cloud wallet. This means that authentication
is done via google cloud api, and private keys are managed for the users
by EZ Wallet in the cloud.

Users never need to write down, store, or be worried about the complexities
of private key management - EZ Wallet will remain available to the user even
if they lose access to their laptop or mobile phone. This is the key benefit
of using EZ Wallet :)

Key technologies in EZ Wallet:
* typescript / react frontend
* relational database
* server side functions api
* cron scheduled background job

## Build

Build with: npm i --legacy-peer-deps

## Description of components

### Frontend

Frontend is written in React / typescript
Integrated with Google login via react-google-login

### Backend REST api

Backend is written in typescript
Server side functions allow:
1. wallet creation (getwallet)
2. withdrawal of funds (withdraw)

### Backend scheduled job

There is a scheduled job on the backend that runs every minute.
This job looks for new withdrawals, and processes the payment on solana blockchain