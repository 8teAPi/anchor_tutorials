/// the anchor_lang library
use anchor_lang::prelude::*;

/// This macro allows Anchor programs not to specify 
/// 'solana_program' as an additional crate dependency.
/// This should be used at the root of all Anchor 
/// based programs. The program's ID is a static public key 
/// Input: a single literal base58 string representation 
/// of a program's id. 
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

/// the program attribute, basically modified the base0
/// and provides RPC handlers that the program 
/// may invoke
#[program]
pub mod base0 {
    use super::*;
    
    /// the program has some non-argument inputs that
    /// it may need to use. Context struct contains
    /// a) program_id 
    /// b) accounts - deserialized accounts
    /// c) remaining accounts - not deserialized or validated
    /// Context is the first parameter of every RPC handler
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

/// A data structure of validated accounts that can be 
/// deserialized from the input to a Solana program. 
#[derive(Accounts)]
pub struct Initialize {}
