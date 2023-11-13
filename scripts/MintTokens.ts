import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../../typechain-types";
import "dotenv/config";
require("dotenv").config();

async function main() {
  const MINT_AMOUNT = ethers.parseUnits("20");

  // providers and blockstamps
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const lastBlock = await provider.getBlock("latest");
  console.log(`Last block number: ${lastBlock?.number}`);
  const lastBlockTimestamp = lastBlock?.timestamp ?? 0;
  const lastBlockDate = new Date(lastBlockTimestamp * 1000);
  console.log(
    `Last block timestamp: ${lastBlockTimestamp} (${lastBlockDate.toLocaleDateString()} ${lastBlockDate.toLocaleTimeString()})`
  );

  // Attaching the smart contract using typechain
  const myTokenContractFactory = new MyToken__factory(wallet);
  const myTokenContractAddress = "0x4655e29c8d3b26e07e0bff3c3ae6d962c1090f0a";
  const myTokenContract = (await myTokenContractFactory.attach(
    myTokenContractAddress
  )) as MyToken;

  const mintKentAddress = "0x095491fc9d55de867d42c096c35aba751758c4be";
  const mintLorenAddress = "0xed3cec444f3c79a433b49ff6cd1f8bb7b8ad7454";
  const mintTomoAddress = "0xe3c382a8b72643cc3756d532e967eb44e885c619";
  const mintCeriseAddress = "0xacbed006ac55c6480cc172141a61f02137cab0cc";
  const mintMonkAddress = "0xf122871816918a04108e051caa31c6438718b61e";

  const mintTx = await myTokenContract
    .connect(wallet)
    .mint(mintMonkAddress, MINT_AMOUNT);
  const receipt = await mintTx.wait();
  console.log(`Minted ${MINT_AMOUNT} tokens for ${mintMonkAddress}\n`);
  console.log(`Transaction completed ${receipt?.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
