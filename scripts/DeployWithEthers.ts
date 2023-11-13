import { ethers } from "ethers";
import { MyToken__factory, TokenizedBallot__factory } from "../typechain-types";
import 'dotenv/config';
require('dotenv').config();

const MINT_VALUE = ethers.parseEther("1");

async function main() {
    // const [deployer, acc1, acc2] = await ethers.getSigners();
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider)
    const acc1 = { address: await wallet.getAddress() }; // deployer
    const acc2 = { address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' }; // hardhat[0]
    console.log(`Account 1 address: ${acc1.address}\n`);
    const contractFactory = new MyToken__factory(wallet);
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    console.log(`Token contract deployed at ${contractAddress}\n`);

    const mintTx = await contract.mint(acc1.address, MINT_VALUE);
    // const mintTx = await contract.mint(acc1.address, MINT_VALUE / 2n);
    await mintTx.wait();
    console.log(
        `Minted ${MINT_VALUE.toString()} decimal units to account ${acc1.address}\n`
    );
    const balanceBN = await contract.balanceOf(acc1.address);
    console.log(
        `Account ${acc1.address
        } has ${balanceBN.toString()} decimal units of MyToken\n`
    );

    const votes = await contract.getVotes(acc1.address);
    console.log(
        `Account ${acc1.address
        } has ${votes.toString()} units of voting power before self delegating\n`
    );

    const delegateTx = await contract.delegate(acc1.address);
    await delegateTx.wait(3);
    const votesAfter = await contract.getVotes(acc1.address);
    console.log(
        `Account ${acc1.address
        } has ${votesAfter.toString()} units of voting power after self delegating\n`
    );

    // Warning! Error encountered during contract execution[out of gas] 
    //   receipt: TransactionReceipt {
    //     provider: JsonRpcProvider {},
    //     to: '0x0e13fDFcdb7B157ccaC656Bb0ccb3fa405Ff6004',
    //     from: '0xE3c382A8B72643CC3756D532e967Eb44e885c619',
    //     contractAddress: null,
    //     hash: '0x8dc8cb89b4e6759b4b154ce163898171fc7b1b3d75f42f74ad8322fd46e5e4af',
    //     index: 153,
    //     blockHash: '0x3ce2ce2f01b4f7c93d07dd4bc28321a228eb0300d41d7f24b49df402c60145c0',
    //     blockNumber: 4685322,
    //     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    //     gasUsed: 67561n,
    //     cumulativeGasUsed: 29975147n,
    //     gasPrice: 1000015495n,
    //     type: 2,
    //     status: 0,
    //     root: undefined
    // },
    // shortMessage: 'transaction execution reverted'

    const transferTx = await contract.transfer(acc2.address, MINT_VALUE / 2n);
    await transferTx.wait(2);
    const votes1AfterTransfer = await contract.getVotes(acc1.address);
    console.log(
        `Account ${acc1.address
        } has ${votes1AfterTransfer.toString()} units of voting power after transferring\n`
    );
    const votes2AfterTransfer = await contract.getVotes(acc2.address);
    console.log(
        `Account ${acc2.address
        } has ${votes2AfterTransfer.toString()} units of voting power after receiving a transfer\n`
    );

    const lastBlock = await provider.getBlock("latest");
    const lastBlockNumber = lastBlock?.number ?? 0;
    if (lastBlockNumber === 0) {
        throw new Error("lastBlockNumber is 0");
    }

    // const contractAddress = '0x4dadC2cbb3e3373Eed1C5C3c0c53f9d01e362EfC';
    const deployer = wallet;

    const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
    const tokenizedBallotFactory = new TokenizedBallot__factory(deployer);
    const TokenizedBallot = await tokenizedBallotFactory.deploy(
        PROPOSALS.map(ethers.encodeBytes32String),
        contractAddress,
        lastBlockNumber - 1
    );
    await TokenizedBallot.waitForDeployment();
    const contractTokenizedBallotAddress = await TokenizedBallot.getAddress();
    console.log(`TokenizedBallot contract deployed at ${contractTokenizedBallotAddress}\n`);

    console.log(`acc1's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc1.address)));
    console.log(`acc2's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc2.address)));

    let tx;
    tx = await TokenizedBallot.vote(1, MINT_VALUE / 4n);
    await tx.wait();
    console.log('vote tx hash:', (await tx.wait())?.hash);
    console.log(`acc1's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc1.address)));
    try {
        tx = await TokenizedBallot.vote(2, MINT_VALUE / 2n);
        await tx.wait();
        console.log(tx)
    } catch (e) {
        console.log('caught', e);
        // return;
    }
    tx = await TokenizedBallot.vote(1, MINT_VALUE / 4n);
    await tx.wait();
    console.log('vote remainder tx hash:', (await tx.wait())?.hash);
    tx = await TokenizedBallot.vote(1, 0n);
    await tx.wait();
    console.log(`acc1's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc1.address)));
    console.log('vote 0 tx hash:', (await tx.wait())?.hash);
    console.log('winning proposal:', ethers.decodeBytes32String(await TokenizedBallot.winnerName()));



}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});