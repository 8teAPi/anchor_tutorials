const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const delay = ms => new Promise(res => setTimeout(res, ms));


describe('base2', () => {
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  // Counter for the tests.
  const counterAcctKeypair = anchor.web3.Keypair.generate();

  // Program for the tests.
  const program = anchor.workspace.Basic2;

  it('Creates a counter', async () => {
    await program.rpc.create(provider.wallet.publicKey, {
      accounts: {
        counter: counterAcctKeypair.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [counterAcctKeypair],
    });

    const counterAccount = await program.account.counter.fetch(counterAcctKeypair.publicKey);

    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() === 0);
  });

  it('Increments a counter', async () => {
    await program.rpc.increment({
      accounts: {
        counter: counterAcctKeypair.publicKey,
        authority: provider.wallet.publicKey,
      },
    });

    const counterAccount = await program.account.counter.fetch(counterAcctKeypair.publicKey);

    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() == 1);
  });

 it('Throws an error when the wrong authority is used and does not increment', async()=> {

  const secondWalletKeypair = anchor.web3.Keypair.generate();

   await expect(program.rpc.increment({
       accounts: {
         counter: counterAcctKeypair.publicKey,
         authority: secondWalletKeypair.publicKey,
       },
   })).to.be.rejectedWith(Error);

     const counterAccount = await program.account.counter.fetch(counterAcctKeypair.publicKey);

     assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
     assert.ok(counterAccount.count.toNumber() == 1);

 });

// The below fails when the delay is not used
// Error: failed to send transaction: Transaction simulation failed: This transaction has already been processed
// This happens from the client not updating its 'recent blockhash', so this would lead to double spend attack

  it('Increments a counter 2nd time', async () => {

    await delay(1000);
    await program.rpc.increment({
      accounts: {
        counter: counterAcctKeypair.publicKey,
        authority: provider.wallet.publicKey,
      },
    });

    const counterAccount = await program.account.counter.fetch(counterAcctKeypair.publicKey);

    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() == 2);
 });





});

