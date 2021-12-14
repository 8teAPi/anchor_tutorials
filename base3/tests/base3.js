const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { rpc } = require("@project-serum/anchor/dist/cjs/utils");
const { SystemProgram } = anchor.web3;


describe('base3', () => {

  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const puppetMaster = anchor.workspace.PuppetMaster;
  const puppet = anchor.workspace.Puppet;

  // Initialize a new puppet account.
  const newPuppetAcctKeypair = anchor.web3.Keypair.generate();

  it('Performs CPI from puppet master to puppet', async () => {
    const tx_puppet_initialize = await puppet.rpc.initialize({
      accounts: {
        puppet: newPuppetAcctKeypair.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [newPuppetAcctKeypair],
    });

    console.log("Your transaction signature", tx_puppet_initialize);

    // Invoke the puppet master to perform a CPI to the puppet.
    await puppetMaster.rpc.pullStrings(new anchor.BN(111), {
      accounts: {
        puppet: newPuppetAcctKeypair.publicKey,
        puppet_program: puppet.programId,
      }
    });

    // Check the state updated.
    const puppetAccount = await puppet.account.data.fetch(newPuppetAcctKeypair.publicKey);
    assert.ok(puppetAccount.data.eq(new anchor.BN(111)));
    
    
    
    
  });




});




////


describe("basic-3", () => {
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it("Performs CPI from puppet master to puppet", async () => {
    const puppetMaster = anchor.workspace.PuppetMaster;
    const puppet = anchor.workspace.Puppet;

    // Initialize a new puppet account.
    const newPuppetAccount = anchor.web3.Keypair.generate();
    const tx = await puppet.rpc.initialize({
      accounts: {
        puppet: newPuppetAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [newPuppetAccount],
    });

    // Invoke the puppet master to perform a CPI to the puppet.
    await puppetMaster.rpc.pullStrings(new anchor.BN(111), {
       accounts: {
          puppet: newPuppetAccount.publicKey,
          puppetProgram: puppet.programId,
       },
    });

    // Check the state updated.
    puppetAccount = await puppet.account.data.fetch(newPuppetAccount.publicKey);
    assert.ok(puppetAccount.data.eq(new anchor.BN(111)));
  });
});
