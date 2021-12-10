import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Base0 } from '../target/types/base0';

describe('base0', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Base0 as Program<Base0>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
