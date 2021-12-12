use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");


/// #[program] : attribute : anchor_lang : a program is defined with the #[program] attribute
/// where each inner method defines an RPC request handler, or, in Solana parlance, an 
/// "instruction" handler. These handlers are the entrypoints to your program that clients 
/// may invoke.
/// ------------------------------------------------------------------------------------------ ///

#[program]
mod basic_1 {
    use super::*;

    /// In this function, take a mutable reference to my_account and assign data to it
    /// 
    /// data : argument: here : any valid Rust types can be passed as inputs
    /// 
    /// ProgramResult : type : solana_program :  type that defines the generic result/error of 
    /// a solana program
    /// 
    pub fn initialize(ctx: Context<Initialize>, data:u64) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }

    // almost identical function to Initialize but with different input struct Update
    pub fn update(ctx: Context<Update>, data: u64) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }
}

/// The Initalize and Update structs are used to define the inputs of the RPC request
/// handlers, used by the program.


/// #[derive(Accounts)] : macro: anchor_lang:  derive macro implementing the Accounts trait,
/// allowing a struct to transform from the untrusted &[AccountInfo] slice given to a Solana
/// program into a validated struct of deserialized account types.
//
/// 'info : lifetime parameter 
/// ------------------------------------------------------------------------------------------ ///
#[derive(Accounts)]
pub struct Initialize <'info>{

    /// In effect we are creating a user field, assigning it a type of Signer, then using the info
    /// to populate the value when invoked. The validation of the Signer account is performed by
    /// type checking. Because we are changing the data upon the initialize, we mark this field
    /// mutable.
    /// 
    /// Signer : type: anchor_lang : Type validating that the account signed the transaction. 
    /// No other ownership or type checks are done. If this is used, one should not try to 
    /// access the underlying account data.
    /// 
    /// #[account(mut)] : attribute macro : anchor_lang : Marking an account as mut persists any
    /// changes made upon exiting the program.
    #[account(mut)]
    pub user: Signer<'info>,

    /// my_account : field : here :  field is of type Account<'info, MyAccount> and the deserialized 
    /// data structure is MyAccount. The my_account field is marked with the init attribute. This 
    /// will create a new account owned by the current program, zero initialized. 
    /// When using init, we must provide:
    /// payer: which will fund the account creation
    /// space, which defines how large the account should be
    /// system_program, which is required by the runtime for creating the account.
    #[account(init, payer = user, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    pub system_program: Program<'info, System>,   
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

/// #[account] : attribute macro : anchor_lang : attribute macro implementing 
/// AccountSerialize and AccountDeserialize, automatically prepending a unique 8 byte 
/// discriminator to the account array. The discriminator is defined by the first 8 bytes 
/// of the Sha256 hash of the account's Rust identifier --i.e., the struct type name
/// --and ensures no account can be substituted for another.
///
/// MyAccount struct is just a container for data, it's the simplest possible struct in Rust.
/// ------------------------------------------------------------------------------------------ ///

#[account]
pub struct MyAccount {
    pub data: u64,
}
