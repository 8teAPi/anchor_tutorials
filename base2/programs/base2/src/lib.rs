use anchor_lang::prelude::*;

/*
 * Here we have a simple **Counter** program, where anyone can 
 * create a counter, but only the assigned **authority** can
 * increment it.
 */

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod base2 {
    use super::*;

    pub fn create(ctx: Context<Create>, authority: Pubkey) -> ProgramResult {
        let counter = &mut ctx.accounts.counter;
        counter.authority = authority;
        counter.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    // why 40?
    #[account(init, payer = user, space = 8 + 40)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    /*
     * has_one: enforces the constraint that 
     * Increment.counter.authority == Increment.authority.key
     * 
     * Signer: type : anchor_lang : This enforces the constraint
     * that the authority account signed the transaction. However,
     * anchor doesn't fetch the data on that account.
     */
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    /*
     * authority : field : here : field is of type `Pubkey`, which is
     * a solana_program type 
     */
    pub authority: Pubkey,
    pub count: u64,
}

