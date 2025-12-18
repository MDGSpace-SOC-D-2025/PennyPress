// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PennyPress {

    mapping(bytes32 => uint256) public articlePrices;
    mapping(bytes32 => address) public articleCreators;
    mapping(bytes32 => mapping(address => bool)) public hasAccess;

    event ArticleRegistered(
        bytes32 indexed articleId, 
        string ipfsCid,
        address indexed creator, 
        uint256 price
    );
    event AccessGranted(bytes32 indexed articleId, address indexed user);

    function registerArticle(bytes32 articleId, uint256 price,  string calldata ipfsCid) external {
        require(articlePrices[articleId] == 0, "Article ID already exists");
        
        articlePrices[articleId] = price;
        articleCreators[articleId] = msg.sender;
        hasAccess[articleId][msg.sender] = true;

        emit ArticleRegistered(articleId, ipfsCid, msg.sender, price);
    }

    function payToAccess(bytes32 articleId) external payable {
        uint256 price = articlePrices[articleId];
        require(price > 0, "Article does not exist");
        require(msg.value >= price, "Insufficient payment");
        require(!hasAccess[articleId][msg.sender], "Already has access");

        hasAccess[articleId][msg.sender] = true;
        address creator = articleCreators[articleId];

        (bool success, ) = payable(creator).call{value: msg.value}("");
        require(success, "Transfer failed");
        
        emit AccessGranted(articleId, msg.sender);
    }

    function checkAccess(bytes32 articleId, address user) external view returns (bool) {
        return hasAccess[articleId][user];
    }
}