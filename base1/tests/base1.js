const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("basic-1", () => {
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  // The program to execute.
  const program = anchor.workspace.Basic1;

  // The Account to create.
  const myAccount = anchor.web3.Keypair.generate();

  it("Creates and initializes an account in a single atomic transaction", async () => {

    // Create the new account and initialize it with the program.
    await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        yAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });

    // Fetch the newly created account from the cluster.
    const account = await program.account.xAccount.fetch(myAccount.publicKey);

    // Check it's state was initialized.
    assert.ok(account.data.eq(new anchor.BN(1234)));

  });


  it("Updates a previously created account", async () => {

    // Invoke the update rpc.
    await program.rpc.update(new anchor.BN(4321), {
      accounts: {
        yAccount: myAccount.publicKey,
      },
    });

    // Fetch the newly updated account.
    const account = await program.account.xAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.ok(account.data.eq(new anchor.BN(4321)));

  });
});
