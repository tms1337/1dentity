# 1dentity

<p align="center">
  <img src="https://imgur.com/lEJlcJu.png" width="500" />
</p>

# What is this

!!! draft/in progress

We use this repository as a monorepo for anything related to our crypto hobby projects that sometimes become real stuff.
Small repo with some bits and pieces for the project idea we have in mind currently, not updated frequently since not our main occupation at the moment.

We have two folders

```
- app/
- tooling/
```

The `app/` is where the app is/will/should be. And the `tooling/` directory currently are bits and pieces of some of our hobby tools we develop for ourselves, but are all in progress and not maintaned actively. 

# Documentation and plan

(note that this is work in progress)

https://docs.google.com/document/d/1bu0DkkK5cvoPJLR3ljY7SYGIDmV_pnxvFefLS4Va93I/edit?usp=sharing

# Short project description

The goal is top smooth the dapp and web3 experience so that usage feels seemless like web2, but still being cryptographically secure and decentralized

The system is comprised of mobile app and browser extension that together offer universal identity provider. Basically decentralized private key management solution with focus not being on the specific key, meaning key can be lost/stolen/compromised and still recovered or re-generated. But identity is unique and singular! We will explain more technical details below.

You can see the quick sample demo in this video to understand the following explainer better: //TODO: insert demo link

We also have semi-ready the technical documentation including both user flows, but also crypto and security models for the project. We can review and discuss this in the next phases potentially if we agree on collaboration. Here is the draft version with not full info (in progress):

https://docs.google.com/document/d/1bu0DkkK5cvoPJLR3ljY7SYGIDmV_pnxvFefLS4Va93I/edit?usp=sharing

We think you can get a clearer picture with some step-by-step examples.

Dapp usage flow:
- dapp asks the extension to confirm the session (via web3.connect() or similar to Metamask in any case)
- extension publishes the confirmation and a request for mobile app to approve a certain session nonce on-chain (signed with a private key)
- mobile app or push notification server reads the confirmation and nonce and asks user to approve it (via biometrics if available, or PIN if not)
- on random (rarely, 1-5% of the times), based on block hash data, transaction and other sources of randomness (possibly oracle), user is sometimes asked to answer the multiple choice question, but rarely. If answered wrong, identity is blocked. Attacker has 25% chance to guess the answer (given he has no pre-knowledge about it)
- on random (rarely, 1-5% of the times), based on block hash data, transaction and other sources of randomness (possibly oracle), user is sometimes sent an email to confirm the transaction as an additional layer of protection. If not approved withing timeframe or explicitly rejected, identity is locked and needs to be recovered.
- if approved, mobile app publishes on-chain the full request+confirmations (signed with a private key)
- dapp can now use this to directly ask the mobile app for each subsequent transaction in a session
- [discussion needed] dapp sessions are time limited for security purposes (user can set the arbitrary session duration if he/she wishes, but no permanent-sessions are allowed)

Features:
- Single identity is assigned to the user. Each user has username and email.
- Public and private key can change and be recovered/re-generated.
- Browser extension and mobile app are connected to one another, meaning manage the same identity (they don’t share any private keys). They connect by scanning the special QR code shown on extension installation by mobile phone where the mobile app is installed.
- Browser extensions for a single identity can be installed on multiple devices where we wish to use the identity (each of them has separate private+public key pair)
- When using the dapps, extension asks for session approval once (connecting to dapp), while each transaction needs to be confirmed on a mobile app.
- If no browser extension is present, dapp can decide to support our auth solution directly in the dapp itself via iframe.
- Smart contracts ensure smooth yet cryptographically secure experience in a decentralized manner (more details in a technical paper at )

Registration flow mobile app:
- public and private key are generated by using phone safe randomness source
- [if possible] public and private key are stored in the safe storage area, or even better use crypto hardware module where possible/available
- user enters username and email
- public key is associated with username and email and published on chain (via smart-contract) => this is now the identity
- [optional] user adds 2-3 questions with multiple choice answers (only he/she knows the right ones, this is additional layer of protection)
- questions are also registered/published on-chain (stored in the smart contract)
- user adds “recoverers”, addresses/usernames that can lock and recover the identity (k/N required to recover); cc similar to @Argent guardian concept

Registration flow browser extension:
- public and private key are generated by using browser safe randomness source
- special QR code is shown containing the info needed for the mobile app to connect to the extension
- user scans the QR code with mobile phone (adds a device)
- [on-chain] extension and mobile app are now connected and refer to the same identity, this is written on chain alongside public keys for later cryptographic checks

# Milestones

Below are milestones and deliverables (required time in parenthesis for each point):

- design and discuss with feedback all the user flows in details using mocks, plan the architecture of the system, setup work organization and delegation system (1 week)
- write end-to-end tests that are both documentation and definition of done, since we use test driven development - TDD (2-3 days)
- obtain high fidelity design (1-2 weeks, depending on the designer)
- build browser extension - frontend only, mock the blockchain calls (2 weeks with testing, bug fixes and feedback)
- build mobile app and/or progressive web app - frontend only, mock the blockchain calls (2 weeks with testing, bug fixes and feedback)
- write relevant smart contracts (2-3 weeks with testing with detailed planning and edge case definition)
- review smart contracts (1 week)
- prove smart contracts are safe and guarantee some properties (we have our own toolbox for this, we use reduced subset of the langugage to be able to do this) (cca 2 weeks if we want to be fully secure, can be also 2 days if not)
- connect mobile app to smart contracts (1 week)
- connect browser extension to smart contracts (1 week)
- pass end-to-end tests, do some manual testing as well with a small user base as alpha (as desired)
- [optional] do a proper smart contract audit by an external company specialized for this (unknown at this point without further info
