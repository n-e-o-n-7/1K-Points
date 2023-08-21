// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Points1K is ERC20 {
    address private _one;
    address private _thousand;

    constructor() ERC20("1K Points", "1K") {
        _one = msg.sender;
        _thousand = msg.sender;
        _mint(msg.sender, totalSupply() * 10 ** decimals());
    }

    function totalSupply() public view virtual override returns (uint256) {
        return 1000;
    }

    function decimals() public pure virtual override returns (uint8) {
        return 0;
    }

    function oneThousand(int value) public onlyThousand returns (bool) {
        if (value < 0) {
            _transfer(_one, _thousand, uint(-value));
        }

        if (value > 0) {
            _transfer(_thousand, _one, uint(value));
        }
        return true;
    }

    //Thousand
    event ThousandTransferred(
        address indexed previousThousand,
        address indexed newThousand
    );

    modifier onlyThousand() {
        _checkThousand();
        _;
    }

    function _checkThousand() internal view {
        require(_thousand == _msgSender(), "caller is not the Thousand");
    }

    function _transferThousand(address newThousand) internal {
        address oldThousand = _thousand;
        _thousand = newThousand;
        emit ThousandTransferred(oldThousand, newThousand);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override onlyThousand {
        if (from == _one) {
            _transferThousand(to);
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
