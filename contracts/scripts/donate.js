const hre = require("hardhat");

// returns the Ether balance of the address passed in as a parameter
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function printBalances() {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(
      `${account.address} has ${await getBalance(account.address)} ETH`
    );
  }
}

async function printDonations(donations) {
  for (const donation of donations) {
    const timestamp = donation.time;
    const donator = donation.name;
    const donatorsAddress = donation.from;
    const message = donation.message;
    console.log(
      `At ${timestamp} - ${donator} (${donatorsAddress}) said: ${message}`
    );
  }
}

async function main() {
  // get example accounts
  const [owner, donator, donator2, donator3] = await hre.ethers.getSigners();
  // get the contract to deploy
  const CharityDonations = await hre.ethers.getContractFactory("Donate");

  // deploy the contract
  const Donation = await CharityDonations.deploy();
  await Donation.waitForDeployment();
  console.log("Donate deployed to:", Donation.address);

  // check the balance of the contract
  const address = [owner.address, donator.address, Donation.address];
  console.log(" == start == ");
  await printBalances(address);

  // donate some money

  // check balances after coffee purchase

  // read all the memos
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
