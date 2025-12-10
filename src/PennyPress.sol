// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PennyPress is Ownable {

    event ContentUnlocked(bytes32 indexed contentId, address indexed buyer, uint256 price);


    mapping(bytes32 => mapping(address => bool)) public hasAccess;

    constructor() Ownable(msg.sender) {}

    function payToAccess(bytes32 contentId) external payable {
        
        require(msg.value > 0, "Payment required");

        hasAccess[contentId][msg.sender] = true;

        emit ContentUnlocked(contentId, msg.sender, msg.value);

        (bool sent, ) = owner().call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    
    function checkAccess(bytes32 contentId, address user) external view returns (bool) {
        return hasAccess[contentId][user];
    }
} 