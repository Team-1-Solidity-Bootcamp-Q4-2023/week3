import { ethers } from "hardhat";
import { MyToken__factory, TokenizedBallot__factory } from "../typechain-types";

// const MINT_VALUE = 1;
const MINT_VALUE = ethers.parseEther("1");

async function main() {

    const [deployer, acc1, acc2] = await ethers.getSigners();
    const contractFactory = new MyToken__factory(deployer);
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    console.log(`Token contract deployed at ${contractAddress}\n`);

    const mintTx = await contract.mint(acc1.address, MINT_VALUE);
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

    const delegateTx = await contract.connect(acc1).delegate(acc1.address);
    await delegateTx.wait();
    const votesAfter = await contract.getVotes(acc1.address);
    console.log(
        `Account ${acc1.address
        } has ${votesAfter.toString()} units of voting power after self delegating\n`
    );

    const transferTx = await contract
        .connect(acc1)
        .transfer(acc2.address, MINT_VALUE / 2n);
    await transferTx.wait();
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

    const lastBlock = await ethers.provider.getBlock("latest");
    const lastBlockNumber = lastBlock?.number ?? 0;
    for (let index = lastBlockNumber - 1; index > 0; index--) {
        const pastVotes = await contract.getPastVotes(
            acc1.address,
            index
        );
        console.log(
            `Account ${acc1.address
            } had ${pastVotes.toString()} units of voting power at block ${index}\n`
        );
    }


    const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
    const tokenizedBallotFactory = new TokenizedBallot__factory(deployer);
    const TokenizedBallot = await tokenizedBallotFactory.deploy(
        PROPOSALS.map(ethers.encodeBytes32String),
        contractAddress,
        lastBlockNumber
    );
    await TokenizedBallot.waitForDeployment();
    const contractTokenizedBallotAddress = await TokenizedBallot.getAddress();
    console.log(`TokenizedBallot contract deployed at ${contractTokenizedBallotAddress}\n`);

    const votingPower = await TokenizedBallot.votingPower(acc1.address);
    console.log(`acc1's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc1.address)));
    console.log(`acc2's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc2.address)));

    let tx;
    tx = await TokenizedBallot.connect(acc1).vote(1, MINT_VALUE / 4n);
    console.log('vote tx hash:', (await tx.wait())?.hash);
    console.log(`acc1's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc1.address)));
    try {
        tx = await TokenizedBallot.connect(acc1).vote(2, MINT_VALUE / 2n);
        console.log(tx)
    } catch (e) {
        console.log('caught', e);
        // return;
    }
    tx = await TokenizedBallot.connect(acc1).vote(1, MINT_VALUE / 4n);
    console.log('vote remainder tx hash:', (await tx.wait())?.hash);
    tx = await TokenizedBallot.connect(acc1).vote(1, 0n);
    console.log(`acc1's votingPower:`, ethers.formatEther(await TokenizedBallot.votingPower(acc1.address)));
    console.log('vote 0 tx hash:', (await tx.wait())?.hash);
    console.log('winning proposal:', ethers.decodeBytes32String(await TokenizedBallot.winnerName()));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});