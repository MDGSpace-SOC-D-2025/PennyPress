// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PennyPress {
    // --- State Variables ---
    mapping(bytes32 => uint256) public articlePrices;
    mapping(bytes32 => address) public articleCreators;
    mapping(bytes32 => mapping(address => bool)) public hasAccess;

    // --- Events ---
    event ArticleRegistered(bytes32 indexed articleId, address indexed creator, uint256 price);
    event AccessGranted(bytes32 indexed articleId, address indexed user);

    // --- 1. CREATOR FUNCTION: Register ---
    function registerArticle(bytes32 articleId, uint256 price) external {
        require(articlePrices[articleId] == 0, "Article ID already exists");
        
        // A. Store Metadata
        articlePrices[articleId] = price;
        articleCreators[articleId] = msg.sender;

        // B. Give Creator Free Access (So they can view their own post)
        hasAccess[articleId][msg.sender] = true;

        emit ArticleRegistered(articleId, msg.sender, price);
    }

    // --- 2. USER FUNCTION: Buy ---
    function payToAccess(bytes32 articleId) external payable {
        uint256 price = articlePrices[articleId];
        require(price > 0, "Article does not exist");
        require(msg.value >= price, "Insufficient payment");
        require(!hasAccess[articleId][msg.sender], "Already has access");

        // A. Grant Access FIRST (Effect)
        // We update state BEFORE sending money to prevent Reentrancy attacks
        hasAccess[articleId][msg.sender] = true;

        // B. Pay the Creator (Interaction)
        address creator = articleCreators[articleId];
        
        // --- FIX IS HERE ---
        // Instead of .transfer(), we use .call which is safer for zkSync
        (bool success, ) = payable(creator).call{value: msg.value}("");
        require(success, "Transfer failed");
        
        emit AccessGranted(articleId, msg.sender);
    }

    // --- 3. CHECKER FUNCTION ---
    function checkAccess(bytes32 articleId, address user) external view returns (bool) {
        return hasAccess[articleId][user];
    }
}