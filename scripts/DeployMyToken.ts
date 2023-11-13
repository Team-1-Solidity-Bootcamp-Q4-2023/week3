import { ethers } from "ethers";
import { MyToken__factory } from "../../typechain-types";
import "dotenv/config";
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const myTokenContractFactory = new MyToken__factory(wallet);
  const myTokenContract = await myTokenContractFactory.deploy();
  await myTokenContract.waitForDeployment();
  const myTokenContractAddress = await myTokenContract.getAddress();
  console.log(`MyToken contract deployed at ${myTokenContractAddress}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
