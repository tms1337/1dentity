## Ideas

### Generating private key securely but deterministically

There is a set of issues that needs to be overcome:
- 

### Having second tier confirmation

User would need to confirm tranasactions on additional device which also has a private key. Similar to Argent.

TBA: Identity explainer from gitcoin proposal

### Having private key distributed

This way hard to compromise private key, need to obtain control of k/N nodes.

Information about where are parts of the key should be somehow hidden. They can be somewhere in memory of the contract for example, and only user would know at which locations.

...

### Using second tier confirmation for some tx

For example can be authenticator app, browser extension etc. Should smartly think about it so that the UX is smooth, yet secure.

From the governance part remember that there are state parts 
  - `ADDR => INT my:reputation`
  - `ADDR => INT my:total_reputation`

In that document we explained how reputation is gained.

Idea is that every transfer that has too high diff in relevances asks user for second tier confirmation.

### 