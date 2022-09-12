## Ideas

### Governance by relative reputation

This is specific for contracts which have either:

```
ADDR => INT my:balances
peer:token.balanceOf()
```

Basically if they have token of some sort. This includes DeFi liquidity pools, since they issue tokens, record claims etc.

There are state parts 
  - `ADDR => INT my:reputation`
  - `ADDR => INT my:total_reputation`

You gain reputation for each function call based on factors:
  - time since last call
    - the more the better, means address is older user of the contract
  - time since last call
    - the less the better, means frequent contract user
  - current balance
    - to avoid just getting a lot of small transactions through to cheat the system, total balance at the moment is also a factor
    - if address consistently has large balance, means it's staked in the contract, economic incentive not to cheat
  - tokens staked for insurance
    - user can choose to store part of tokens somewhere else (ofc not in the same contract), to gain more voting power in governance
  - ? cluster analysis
    - is the address in the isolated cluster of transactions? => this might be indicative of some fake, unused or not relevant accounts

Let's denote:

```
R = my:reputation[a]
T = my:total_reputation
q = R / T
```

This means that `q` is the relative stakeness/importance of an address `a` in the contract. It is assumed that if you are invested and/or heavy user of a contract that you won't have incentive to cheat.

### Governance by hard forking the contract

The idea is to restore the contract in some of the previous states, before the attacker did the attack.

We assume contract has state variable `INT my:id` which makes it unique and denotes the specific fork. This can also help exchanges to just ignore the contract where the attacker did the attack since those tokens would be rendered worthless.

Issue: What to do with the transactions that happened after the hack? For example, it could be that attacker paid somebody and now the person will lose that value. On the other hand attacker can do this with a lot of addresses to try to trick reversion to don't revert these transactions (if assuming some revert some not, so not black-or-white fork)

Potential solution: Use relevance of the receiving address to know if to keep transaction. Attacker probably won't be able to make a lot of accounts with high relevance, at least not in short time since that's one of the factors. The hack would need to be prepared for a long time, and a lot of money spent => so probably not feasible economically to do it.
