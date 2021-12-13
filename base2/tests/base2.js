const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("basic-2", () => {
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  // Program for the tests.
  const program = anchor.workspace.Basic2;

  // The Account to create.
  const counterAcctKeypair = anchor.web3.Keypair.generate();

  it("Creates a counter", async () => {

    await program.rpc.create(provider.wallet.publicKey, {
      accounts :{
        counter: counterAcctKeypair.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers:[counterAcctKeypair],
    });


    // Fetch the newly created account from the cluster.
    const counterAccount = await program.account.counter.fetch(counterAcctKeypair.publicKey);


    // Check the authority and count
    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));  
    assert.ok(counterAccount.count.toNumber() === 0);

  });


  it("Updates a counter", async () => {

    // Invoke the increment rpc.
    await program.rpc.increment({
      accounts: {
        counter: counterAcctKeypair.publicKey,
        authority: provider.wallet.publicKey,
      },
    });

    // Fetch the newly updated account.
    const counterAccount = await program.account.counter.fetch(counterAcctKeypair.publicKey);

    // Check it's state was mutated.
    // Check the authority and count
    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));  
    assert.ok(counterAccount.count.toNumber() === 1);
    assert.ok(counterAccount.count.eq(new anchor.BN(1)));

  });
});
