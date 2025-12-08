// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PennyPress is Ownable {
    // Event to help Goldsky index the data later
    event ContentUnlocked(bytes32 indexed contentId, address indexed buyer, uint256 price);

    // Track who has access to what: contentId => user => true/false
    mapping(bytes32 => mapping(address => bool)) public hasAccess;

    constructor() Ownable(msg.sender) {}

    // The main function your React app calls
    function payToAccess(bytes32 contentId) external payable {
        // 1. Check if they sent money (we handle the specific price check in frontend for now)
        require(msg.value > 0, "Payment required");

        // 2. Unlock the content
        hasAccess[contentId][msg.sender] = true;

        // 3. Emit the event
        emit ContentUnlocked(contentId, msg.sender, msg.value);

        // 4. Withdraw the money to the owner (you) automatically
        // In the future, this will split 95% to creator / 5% to protocol
        (bool sent, ) = owner().call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    
    // View function for the frontend to check access
    function checkAccess(bytes32 contentId, address user) external view returns (bool) {
        return hasAccess[contentId][user];
    }
}