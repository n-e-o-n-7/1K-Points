import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { Contract } from "ethers"
import { ethers } from "hardhat"

describe("Points1K", function () {
	let token: Contract

	beforeEach(async () => {
		token = await loadFixture(deploy)
	})

	async function deploy() {
		const Token = await ethers.getContractFactory("Points1K")
		const token = await Token.deploy()
		return token
	}

	describe("deploy", function () {
		it("should be named 1K Points", async () => {
			expect(await token.name()).to.eq("1K Points")
		})

		it("should have 1K symbol", async () => {
			expect(await token.symbol()).to.eq("1K")
		})

		it("should have a total supply of 1000", async () => {
			expect(await token.totalSupply()).to.eq(ethers.parseUnits("1000", 0))
		})
	})

	describe("first", function () {
		const amount = ethers.parseUnits("1000", 0)
		it("should transfer Thousand", async () => {
			const [from, to] = await ethers.getSigners()
			await token.transfer(to.address, amount)
		})

		it("transfer to one", async () => {
			const [from, to] = await ethers.getSigners()
			await token.oneThousand(-10)
		})
	})

	describe("events", function () {
		const amount = ethers.parseUnits("1000", 0)
		it("should emit Transfer event", async function () {
			const [from, to] = await ethers.getSigners()
			await expect(token.transfer(to.address, amount))
				.to.emit(token, "Transfer")
				.withArgs(from.address, to.address, amount)
		})
	})
})
