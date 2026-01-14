// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract PennyPress is ReentrancyGuard, Ownable {

    struct ArticleInfo {
        uint256 price;
        address creator;
        uint256 totalStaked;
        uint256 accRewardsPerShare;
        bool exists;
    }

    struct UserInfo {
        uint256 amount;     
        uint256 rewardDebt;
    }

    mapping(bytes32 => ArticleInfo) public articles;
    mapping(bytes32 => mapping(address => UserInfo)) public userInfo;
    mapping(bytes32 => mapping(address => bool)) public hasAccess;

    mapping(address => uint256) public creatorBalances; 
    uint256 public treasuryBalance;                     

    uint256 private constant PRECISION_FACTOR = 1e12;

    address[] public creatorsToPay;
    mapping(address => bool) public isWaitingForPay;

    event ArticleRegistered(bytes32 indexed articleId, string ipfsCid, address indexed creator, uint256 price);
    event AccessGranted(bytes32 indexed articleId, address indexed user);
    event Staked(bytes32 indexed articleId, address indexed staker, uint256 amount);
    event Unstaked(bytes32 indexed articleId, address indexed staker, uint256 amount);
    event RewardClaimed(bytes32 indexed articleId, address indexed staker, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function registerArticle(bytes32 articleId, uint256 price, string calldata ipfsCid) external {
        require(!articles[articleId].exists, "ID exists");
        require(price > 0, "Price > 0");

        articles[articleId] = ArticleInfo({
            price: price,
            creator: msg.sender,
            totalStaked: 0,
            accRewardsPerShare: 0,
            exists: true
        });

        hasAccess[articleId][msg.sender] = true;
        emit ArticleRegistered(articleId, ipfsCid, msg.sender, price);
    }

    function payToAccess(bytes32 articleId) external payable nonReentrant {
        ArticleInfo storage article = articles[articleId];
        require(article.exists, "Article not found");
        require(msg.value >= article.price, "Insufficient funds");
        require(!hasAccess[articleId][msg.sender], "Already accessed");

        hasAccess[articleId][msg.sender] = true;

        uint256 creatorShare = (msg.value * 90) / 100;
        uint256 stakerShare  = (msg.value * 5)  / 100;
        uint256 treasuryShare = msg.value - creatorShare - stakerShare; 

        creatorBalances[article.creator] += creatorShare;
        if (!isWaitingForPay[article.creator]) {
            creatorsToPay.push(article.creator);
            isWaitingForPay[article.creator] = true;
        }

        if (article.totalStaked > 0) {
            article.accRewardsPerShare += (stakerShare * PRECISION_FACTOR) / article.totalStaked;
        } else {
            treasuryShare += stakerShare;
        }
        treasuryBalance += treasuryShare;

        emit AccessGranted(articleId, msg.sender);
    }

    function stake(bytes32 articleId) external payable nonReentrant {
        require(msg.value > 0, "Cannot stake 0");
        ArticleInfo storage article = articles[articleId];
        require(article.exists, "Article not found");
        
        UserInfo storage user = userInfo[articleId][msg.sender];

        if (user.amount > 0) {
            uint256 pending = (user.amount * article.accRewardsPerShare / PRECISION_FACTOR) - user.rewardDebt;
            if (pending > 0) {
                (bool success, ) = payable(msg.sender).call{value: pending}("");
                require(success, "Transfer failed");
                emit RewardClaimed(articleId, msg.sender, pending);
            }
        }

        user.amount += msg.value;
        article.totalStaked += msg.value;

        user.rewardDebt = user.amount * article.accRewardsPerShare / PRECISION_FACTOR;

        emit Staked(articleId, msg.sender, msg.value);
    }

    function unstake(bytes32 articleId) external nonReentrant {
        ArticleInfo storage article = articles[articleId];
        UserInfo storage user = userInfo[articleId][msg.sender];
        require(user.amount > 0, "Nothing to unstake");

        uint256 pending = (user.amount * article.accRewardsPerShare / PRECISION_FACTOR) - user.rewardDebt;

        uint256 amountToReturn = user.amount;
        user.amount = 0;
        article.totalStaked -= amountToReturn;
        user.rewardDebt = 0; 

        uint256 totalToSend = amountToReturn + pending;
        (bool success, ) = payable(msg.sender).call{value: totalToSend}("");
        require(success, "Transfer failed");

        emit Unstaked(articleId, msg.sender, amountToReturn);
        if (pending > 0) {
            emit RewardClaimed(articleId, msg.sender, pending);
        }
    }

    function claimRewards(bytes32 articleId) external nonReentrant {
        ArticleInfo storage article = articles[articleId];
        UserInfo storage user = userInfo[articleId][msg.sender];
        require(user.amount > 0, "No stake found");

        uint256 pending = (user.amount * article.accRewardsPerShare / PRECISION_FACTOR) - user.rewardDebt;
        require(pending > 0, "No rewards to claim");

        user.rewardDebt = user.amount * article.accRewardsPerShare / PRECISION_FACTOR;

        (bool success, ) = payable(msg.sender).call{value: pending}("");
        require(success, "Transfer failed");

        emit RewardClaimed(articleId, msg.sender, pending);
    }

    function getPendingRewards(bytes32 articleId, address _user) external view returns (uint256) {
        ArticleInfo storage article = articles[articleId];
        UserInfo storage user = userInfo[articleId][_user];
        
        if (user.amount == 0) return 0;

        return (user.amount * article.accRewardsPerShare / PRECISION_FACTOR) - user.rewardDebt;
    }

    function checkAccess(bytes32 articleId, address user) external view returns (bool) {
        return hasAccess[articleId][user];
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
}