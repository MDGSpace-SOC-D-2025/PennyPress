// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "../lib/openzeppelin-contracts/lib/forge-std/src/console.sol";
import { Test } from "../lib/openzeppelin-contracts/lib/forge-std/src/Test.sol";
import {PennyPress} from "./PennyPress.sol";

contract PennyPressTest is Test{ 

    PennyPress public pennyPress;
    address public Creator = makeAddr("creator");
    address public User = makeAddr("user");
    
    event ArticleRegistered(
        bytes32 indexed articleId, 
        string ipfsCid,
        address indexed creator, 
        uint256 price
    );

    function setUp() public {
        pennyPress = new PennyPress();

    }
    
    function testRegisterArticle() public{
        bytes32 testArticleId = keccak256("TestArticleId");
        uint256 testPrice = 0.1 ether;
        string memory testIpfsID = "SomeTestingHash123";

        vm.startPrank(Creator);

        vm.expectEmit(true,true,true,true);
        emit ArticleRegistered(testArticleId, testIpfsID, Creator, testPrice);

        pennyPress.registerArticle(testArticleId, testPrice, testIpfsID);

        vm.expectRevert("Article ID already exists");
        pennyPress.registerArticle(testArticleId, testPrice, testIpfsID);
        
        assertEq(pennyPress.articlePrices(testArticleId) , testPrice);
        assertEq(pennyPress.articleCreators(testArticleId), Creator);
        assertEq(pennyPress.hasAccess(testArticleId,Creator) , true);
        
        vm.stopPrank();

    }
    
    function testPayToAccess() public {
        RevertingReceiver badCreator = new RevertingReceiver();

        bytes32 testArticleId = keccak256("TestArticleId");
        bytes32 badArticleId = keccak256("bad-article");
        uint256 testPrice = 0.1 ether;
        string memory testIpfsID = "SomeTestingHash123";

        vm.startPrank(Creator);

        vm.expectRevert("Article does not exist");
        pennyPress.payToAccess(testArticleId);

        vm.deal(Creator, 10 ether);
        pennyPress.registerArticle(testArticleId, testPrice, testIpfsID);

        vm.expectRevert("Insufficient payment");
        pennyPress.payToAccess{value: 0.05 ether}(testArticleId);

        vm.expectRevert("Already has access");
        pennyPress.payToAccess{value: 0.1 ether}(testArticleId);

        vm.stopPrank();

        vm.startPrank(address(badCreator));
        pennyPress.registerArticle(badArticleId, 0.8 ether, testIpfsID);
        vm.stopPrank();

        vm.startPrank(User);

        vm.deal(User, 10 ether);
        pennyPress.payToAccess{value: 0.1 ether}(testArticleId);

        vm.expectRevert("Transfer failed");
        pennyPress.payToAccess{value: 0.8 ether}(badArticleId);

        vm.stopPrank();
    }
    function testCheckAccess() public{
        bytes32 testArticleId = keccak256("TestArticleId");
        uint256 testPrice = 0.1 ether;
        string memory testIpfsID = "SomeTestingHash123";

        vm.startPrank(Creator);  

        pennyPress.registerArticle(testArticleId, testPrice, testIpfsID);
        bool creatorResult = pennyPress.checkAccess(testArticleId, Creator);
        bool userResult = pennyPress.checkAccess(testArticleId, User);
        
        vm.stopPrank();

                assertEq(creatorResult, true);
        assertEq(userResult, false);
    }
}

contract RevertingReceiver {
    receive() external payable {
        revert("I do not accept ETH");
    }
}