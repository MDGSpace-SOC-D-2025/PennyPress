// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract PennyPress is ReentrancyGuard, Ownable {
    
    mapping(bytes32 => uint256) public articlePrices;
    mapping(bytes32 => address) public articleCreators;
    mapping(bytes32 => mapping(address => bool)) public hasAccess;

    mapping(address => uint256) public creatorBalances; 
    uint256 public treasuryBalance;                     
    
    mapping(bytes32 => uint256) public articleRewardPool; 
    mapping(bytes32 => uint256) public totalStakedOnArticle;
    mapping(bytes32 => mapping(address => uint256)) public userStakes;

    address[] public creatorsToPay;
    mapping(address => bool) public isWaitingForPay;
    
    event ArticleRegistered(bytes32 indexed articleId, string ipfsCid, address indexed creator, uint256 price);
    event AccessGranted(bytes32 indexed articleId, address indexed user);
    event Staked(bytes32 indexed articleId, address indexed staker, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function registerArticle(bytes32 articleId, uint256 price, string calldata ipfsCid) external {
        require(articlePrices[articleId] == 0, "ID exists");
        require(price > 0, "Price > 0");

        articlePrices[articleId] = price;
        articleCreators[articleId] = msg.sender;
        hasAccess[articleId][msg.sender] = true;

        emit ArticleRegistered(articleId, ipfsCid, msg.sender, price);
    }

    function payToAccess(bytes32 articleId) external payable nonReentrant {
        uint256 price = articlePrices[articleId];
        require(msg.value >= price, "Insufficient funds");
        require(!hasAccess[articleId][msg.sender], "Already accessed");

        hasAccess[articleId][msg.sender] = true;

        uint256 creatorShare = (msg.value * 90) / 100;
        uint256 stakerShare  = (msg.value * 5)  / 100;
        uint256 treasuryShare = msg.value - creatorShare - stakerShare;

        address creator = articleCreators[articleId];
        creatorBalances[creator] += creatorShare;
        
        if (isWaitingForPay[creator] = false) {
            creatorsToPay.push(creator);
            isWaitingForPay[creator] = true;
        }

        treasuryBalance += treasuryShare;

        if (totalStakedOnArticle[articleId] > 0) {
            articleRewardPool[articleId] += stakerShare;
        } else {
            treasuryBalance += stakerShare;
        }

        emit AccessGranted(articleId, msg.sender);
    }

    function stake(bytes32 articleId) external payable nonReentrant {
        require(msg.value > 0, "Cannot stake 0");
        
        uint256 cap = (articlePrices[articleId]) * 10;
        require(totalStakedOnArticle[articleId] + msg.value <= cap, "Cap reached");

        userStakes[articleId][msg.sender] += msg.value;
        totalStakedOnArticle[articleId] += msg.value;

        emit Staked(articleId, msg.sender, msg.value);
    }

    function claimRewards(bytes32 articleId) external nonReentrant {
        uint256 userStakeAmount = userStakes[articleId][msg.sender];
        uint256 totalStakeAmount = totalStakedOnArticle[articleId];
        uint256 currentPot = articleRewardPool[articleId];

        uint256 share = (currentPot * userStakeAmount) / totalStakeAmount;

        articleRewardPool[articleId] -= share;

        (bool success, ) = payable(msg.sender).call{value: share}("");    
        require(success, "Transfer failed");
    }

    function distributeCreatorIncome() external nonReentrant onlyOwner {
        uint256 count = creatorsToPay.length;
        require(count > 0, "No one to pay");

        for (uint256 i = 0; i < count; i++) {
            address creator = creatorsToPay[i];
            uint256 amount = creatorBalances[creator];
            
            if (amount > 0) {
                creatorBalances[creator] = 0; 
                (bool success, ) = payable(creator).call{value: amount}("");
                require(success, "Transfer failed");
            }
            isWaitingForPay[creator] = false;
        }
        delete creatorsToPay;
    }
    function checkAccess(bytes32 articleId, address user) external view returns (bool) {
        return hasAccess[articleId][user];
    }
}