Basic working skeleton for an anchor-solana project. 

Two ways to run
* anchor test
* full deploy

For full deploy
* run solana-test-validator
* anchor build
* anchor deploy
* get program_id
* edit client_code/client.js with the program_id and path to idl
* run node client.js after setting ANCHOR_WALLET to the keypair

Adapted from
https://project-serum.github.io/anchor/tutorials/tutorial-0.html

