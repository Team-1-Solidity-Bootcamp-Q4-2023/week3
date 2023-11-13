
output from 0m0t running: ts-node ./scripts/DeployWithEthers.ts 


```
Account 1 address: 0xE3c382A8B72643CC3756D532e967Eb44e885c619

Token contract deployed at 0x004138fEFc2966B995c32b6104b6f8aF00948065

Minted 1000000000000000000 decimal units to account 0xE3c382A8B72643CC3756D532e967Eb44e885c619
[https://sepolia.etherscan.io/tx/0x4a092988d5fae857d3e9da3d153c83af3fbf4a7b54802cd4b1aba18af47dc29d]

Account 0xE3c382A8B72643CC3756D532e967Eb44e885c619 has 1000000000000000000 decimal units of MyToken

Account 0xE3c382A8B72643CC3756D532e967Eb44e885c619 has 0 units of voting power before self delegating

Account 0xE3c382A8B72643CC3756D532e967Eb44e885c619 has 1000000000000000000 units of voting power after self delegating
[https://sepolia.etherscan.io/tx/0xa6c11119bbe08edfa17ffb49a6f6ac126ab02ea4b543ba4cc11b19265358172a]

Account 0xE3c382A8B72643CC3756D532e967Eb44e885c619 has 500000000000000000 units of voting power after transferring
[https://sepolia.etherscan.io/tx/0x006e3187a749fd3451609ddf0082bb8e2bdb3e97b0286440d21be19242665602]

Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 0 units of voting power after receiving a transfer

TokenizedBallot contract deployed at 0x77A5480FC861a00686B9ceA73a37115BCEc75B0D

acc1's votingPower: 0.5
acc2's votingPower: 0.0
vote tx hash: 0x419ef24f35f36fc363e04f44adc8e1f34be0d8bdab71147a33471d1770735b4c
[https://sepolia.etherscan.io/tx/0x419ef24f35f36fc363e04f44adc8e1f34be0d8bdab71147a33471d1770735b4c]

acc1's votingPower: 0.25
caught Error: execution reverted: "TokenizedBallot: trying to vote more than allowed" [...continued below...]

vote remainder tx hash: 0xe0c7d90f9063d5c41b28408c3e87283c4b63936e058c168b6a225a34065082be
[https://sepolia.etherscan.io/tx/0xe0c7d90f9063d5c41b28408c3e87283c4b63936e058c168b6a225a34065082be]

acc1's votingPower: 0.0
vote 0 tx hash: 0xed5dfefa1306037592c20f9b4aeebc22c5ef6af4f34914d2c6705d24bb8a9715
[https://sepolia.etherscan.io/tx/0xed5dfefa1306037592c20f9b4aeebc22c5ef6af4f34914d2c6705d24bb8a9715]

winning proposal: Proposal 2

```






## caught

```
caught Error: execution reverted: "TokenizedBallot: trying to vote more than allowed" (action="estimateGas", data="0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000031546f6b656e697a656442616c6c6f743a20747279696e6720746f20766f7465206d6f7265207468616e20616c6c6f776564000000000000000000000000000000", reason="TokenizedBallot: trying to vote more than allowed", transaction={ "data": "0xb384abef000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000006f05b59d3b20000", "from": "0xE3c382A8B72643CC3756D532e967Eb44e885c619", "to": "0x77A5480FC861a00686B9ceA73a37115BCEc75B0D" }, invocation=null, revert={ "args": [ "TokenizedBallot: trying to vote more than allowed" ], "name": "Error", "signature": "Error(string)" }, code=CALL_EXCEPTION, version=6.8.1)
    at makeError (/home/tomo/dev/week3/node_modules/ethers/src.ts/utils/errors.ts:694:21)
    at getBuiltinCallException (/home/tomo/dev/week3/node_modules/ethers/src.ts/abi/abi-coder.ts:118:21)
    at Function.getBuiltinCallException (/home/tomo/dev/week3/node_modules/ethers/src.ts/abi/abi-coder.ts:230:16)
    at JsonRpcProvider.getRpcError (/home/tomo/dev/week3/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:906:32)
    at /home/tomo/dev/week3/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:526:45
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'CALL_EXCEPTION',
  action: 'estimateGas',
  data: '0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000031546f6b656e697a656442616c6c6f743a20747279696e6720746f20766f7465206d6f7265207468616e20616c6c6f776564000000000000000000000000000000',
  reason: 'TokenizedBallot: trying to vote more than allowed',
  transaction: {
    to: '0x77A5480FC861a00686B9ceA73a37115BCEc75B0D',
    data: '0xb384abef000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000006f05b59d3b20000',
    from: '0xE3c382A8B72643CC3756D532e967Eb44e885c619'
  },
  invocation: null,
  revert: {
    signature: 'Error(string)',
    name: 'Error',
    args: [ 'TokenizedBallot: trying to vote more than allowed' ]
  },
  shortMessage: 'execution reverted: "TokenizedBallot: trying to vote more than allowed"',
  info: {
    error: {
      code: 3,
      data: '0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000031546f6b656e697a656442616c6c6f743a20747279696e6720746f20766f7465206d6f7265207468616e20616c6c6f776564000000000000000000000000000000',
      message: 'execution reverted: TokenizedBallot: trying to vote more than allowed'
    },
    payload: {
      method: 'eth_estimateGas',
      params: [Array],
      id: 151,
      jsonrpc: '2.0'
    }
  }
}

```

## Mike's output of DeployMyToken.ts and MintTokens.ts script
```
MyToken contract deployed at 0x4655e29C8d3b26e07E0Bff3C3Ae6d962c1090F0A

Last block number: 4684311
Last block timestamp: 1699861416 (11/13/2023 2:43:36 PM)
Minted 20 tokens for 0x095491fc9d55de867d42c096c35aba751758c4be
Transaction completed 0xdb95dd1ef6de9aa2842273599261b772cfa2142b435ef67cbd259df41b8196f0

Last block number: 4684317
Last block timestamp: 1699861488 (11/13/2023 2:44:48 PM)
Minted 20 tokens for 0xed3cec444f3c79a433b49ff6cd1f8bb7b8ad7454
Transaction completed 0x451579ffafffc7daaf969872b4e1bcd0cbe256fa612644f6cc1e7bc285e9d3da

Last block number: 4684322
Last block timestamp: 1699861560 (11/13/2023 2:46:00 PM)
Minted 20 tokens for 0xe3c382a8b72643cc3756d532e967eb44e885c619
Transaction completed 0x07bc130b8ce19ffb5b6a4bedc4ef5cfe60c63e5400c9d9507ef43858256d2dd7

Last block number: 4684326
Last block timestamp: 1699861608 (11/13/2023 2:46:48 PM)
Minted 20 tokens for 0xacbed006ac55c6480cc172141a61f02137cab0cc
Transaction completed 0x150862fc59552153c7731b195cd87885738697bcfe70328286b2e9a19449f71d

Last block number: 4684329
Last block timestamp: 1699861656 (11/13/2023 2:47:36 PM)
Minted 20 tokens for 0xf122871816918a04108e051caa31c6438718b61e
Transaction completed 0x30bfbf62d2c76c2d777eab01f3b076d1282f46fe44eb9d03516abde43ef4ad55
```
