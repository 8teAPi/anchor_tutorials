
// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.
const anchor = require('@project-serum/anchor');

// insert the program_id post deploy, this is where on the blockchain
// the client will find the contract
const program_id = 'nrPmZ1tZCjXCgtLYx2W1RZzRwNRdVUUAoSaXGuYpgvC';

// the location of the idl
const idl_path = '../target/idl/base0.json';

// Configure the local cluster.
anchor.setProvider(anchor.Provider.local());


async function main() {
  // #region main
  // Read the generated IDL.
  const idl = JSON.parse(require('fs').readFileSync(idl_path, 'utf8'));

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey(program_id);

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);

  // Execute the RPC.
  await program.rpc.initialize();
  // #endregion main
}

console.log('Running client.');
main().then(() => console.log('Success'));




