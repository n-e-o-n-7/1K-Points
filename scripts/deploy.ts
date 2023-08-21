import { ethers } from "hardhat"

async function main() {
	const [deployer] = await ethers.getSigners()

	console.log("Deploying contracts with the account:", deployer.address)

	const token = await ethers.deployContract("Points1K")

	console.log("Points1K address:", await token.getAddress())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error)
		process.exitCode = 1
	})
