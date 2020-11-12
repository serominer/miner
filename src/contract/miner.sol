pragma solidity ^0.6.10;
// SPDX-License-Identifier: GPL-3.0 pragma solidity >=0.4.16 <0.7.0;
pragma experimental ABIEncoderV2;

import './codes.sol';

library SafeMath {

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0);
        uint256 c = a / b;

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }
}

library strings {
    function _bytes32ToStr(bytes32 x) internal pure returns (string memory) {
        uint charCount = 0;
        bytes memory bytesString = new bytes(32);
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            } else if (charCount != 0) {
                break;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint256 j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];

        }
        return string(bytesStringTrimmed);
    }

    function _stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }

    function _stringEq(string memory a, string memory b) internal pure returns (bool) {
        if ((bytes(a).length == 0 && bytes(b).length == 0)) {
            return true;
        }
        if (bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return _stringToBytes32(a) == _stringToBytes32(b);
        }
    }

}

contract SeroInterface {

    bytes32 private topic_sero_send = 0x868bd6629e7c2e3d2ccf7b9968fad79b448e7a2bfb3ee20ed1acbc695c3c8b23;
    bytes32 private topic_sero_currency = 0x7c98e64bd943448b4e24ef8c2cdec7b8b1275970cfe10daf2a9bfa4b04dce905;
    bytes32 private topic_sero_setCallValues = 0xa6cafc6282f61eff9032603a017e652f68410d3d3c69f0a3eeca8f181aec1d17;

    function sero_msg_currency() internal returns (string memory) {
        bytes memory tmp = new bytes(32);
        bytes32 b32;
        assembly {
            log1(tmp, 0x20, sload(topic_sero_currency_slot))
            b32 := mload(tmp)
        }
        return strings._bytes32ToStr(b32);
    }

    function sero_send_token(address _receiver, string memory _currency, uint256 _amount) internal returns (bool success){
        return sero_send(_receiver, _currency, _amount, "", 0);
    }

    function sero_send(address _receiver, string memory _currency, uint256 _amount, string memory _category, bytes32 _ticket) internal returns (bool success){
        bytes memory temp = new bytes(160);
        assembly {
            mstore(temp, _receiver)
            mstore(add(temp, 0x20), _currency)
            mstore(add(temp, 0x40), _amount)
            mstore(add(temp, 0x60), _category)
            mstore(add(temp, 0x80), _ticket)
            log1(temp, 0xa0, sload(topic_sero_send_slot))
            success := mload(add(temp, 0x80))
        }
    }

    function sero_setCallValues(string memory _currency, uint256 _amount, string memory _category, bytes32 _ticket) internal {
        bytes memory temp = new bytes(0x80);
        assembly {
            mstore(temp, _currency)
            mstore(add(temp, 0x20), _amount)
            mstore(add(temp, 0x40), _category)
            mstore(add(temp, 0x60), _ticket)
            log1(temp, 0x80, sload(topic_sero_setCallValues_slot))
        }
        return;
    }

}

contract Ownable {

    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

interface Swap {
    function swap(bytes32 key, uint256 _minTokensReceived, uint256 _timeout, address _recipient) external payable returns (uint256);
}

contract FeroMiner is SeroInterface, Ownable, Codes {

    using SafeMath for uint256;
    
    uint256 constant ONEDAY = 24 * 60 * 60;
    
    uint256 constant LEVEL_1 = 100e18;
    uint256 constant LEVEL_2 = 800e18;
    uint256 constant LEVEL_3 = 2000e18;
    uint256 constant LEVEL_4 = 5000e18;
    uint256 constant LEVEL_5 = 10000e18;
    
    uint256 constant VIP = 29e23;
    

    string constant BASETOKEN = "SUSD";

    struct Investor {
        uint256 referId;
        uint256 amount;
        uint256 returnAmount;
        uint256 canWithdrawAmount;
        uint256 directNodeNum;
        uint256 allNodeNum;
        uint256 achievement;

        uint256 recommendProfit;
        uint256 nodeProfit;
        uint256 communityProfit;
        uint256 dynamicTimestamp;

        uint256 drawTimestamp;
    }

    Investor[] public investors;
    mapping(address => uint256) public addrToId;

    Swap private dex;
    
    address[] private markets;

    constructor(address _swap, address[] memory _markets) public payable {
        dex = Swap(_swap);
        markets = _markets;
        
        addNode(0, 0, address(0));
    }

    receive() external payable {
    }
    
    function setSwap(address _swap) public onlyOwner {
        dex = Swap(_swap);
    }

    function registerNode(address addr) public onlyOwner {
        addNode(0, 0, addr);
    }

    function addNode(uint256 referId, uint256 value, address addr) private returns (uint256 id) {
        id = investors.length;
        addrToId[addr] = id;
        
        investors.push(Investor({referId : referId, amount : value, returnAmount : 0, canWithdrawAmount : 0, directNodeNum : 0, allNodeNum : 0,
            achievement:0, recommendProfit : 0, nodeProfit : 0, communityProfit : 0, drawTimestamp : now, dynamicTimestamp : now
            }));
    }

    function details() public view returns (string memory code, string memory referCode, Investor memory investor)  {
        uint256 id = addrToId[msg.sender];
        if (id == 0) {
            return (code, referCode, investor);
        }

        investor = investors[id];
        code = encode(uint64(id));
        if (investor.referId != 0) {
            referCode = encode(uint64(investor.referId));
        }
        
        uint256 staticProfit = (now / ONEDAY).sub(investor.drawTimestamp / ONEDAY).mul(investor.amount.mul(3).div(1000));
        
        (,uint256 times,) = _levelInfo(id);
        uint256 totalProfit = investors[id].amount.mul(times).div(10);
        
        if(investor.returnAmount + staticProfit > totalProfit) {
            staticProfit = totalProfit - investor.returnAmount;
        }
        
        investor.returnAmount = investor.returnAmount + staticProfit;
        investor.canWithdrawAmount = investor.canWithdrawAmount + staticProfit;

        if (now / ONEDAY != investor.dynamicTimestamp / ONEDAY) {
            investor.nodeProfit = 0;
            investor.communityProfit = 0;
            investor.recommendProfit=0;
        }
    }

    function withdrawBalance(string memory currency) public returns (uint256 value) {
        uint256 id = addrToId[msg.sender];
        require(id != 0);

        _staticProfot(id);
        value = investors[id].canWithdrawAmount;

        investors[id].drawTimestamp = now;
        investors[id].canWithdrawAmount = 0;

        if (value > 0) {
            if (!strings._stringEq(BASETOKEN, currency)) {
                value = swap(value, BASETOKEN, currency, 0);
                require(value > 0);
            }
            require(sero_send_token(msg.sender, currency, value));
        }
    }

    function invest(string memory referCode) public payable returns (uint256 value) {
        string memory currency = sero_msg_currency();
        if (strings._stringEq(BASETOKEN, currency)) {
            value = msg.value;
        } else {
            value = swap(msg.value, currency, BASETOKEN, 0);
            require(value > 0);
        }
        
        require(sero_send_token(markets[0], BASETOKEN, value/50));
        require(sero_send_token(markets[1], BASETOKEN, value*3/100));
        require(sero_send_token(markets[2], BASETOKEN, value*3/250));
        require(sero_send_token(markets[3], BASETOKEN, value*3/1000));

        uint256 id = addrToId[msg.sender];
        if (id == 0) {
            require(value >= LEVEL_1);
            uint256 referId = decode(referCode);
            require(referId != 0 && referId < investors.length);
            id = addNode(referId, value, msg.sender);

            investors[referId].directNodeNum += 1;
            uint256 height;
            while (referId != 0 && height < 100) {
                investors[referId].allNodeNum += 1;
                referId = investors[referId].referId;
                height++;
            }
        } else {
            _staticProfot(id);
            investors[id].amount = investors[id].amount.add(value);
        }
        
        uint256 referId = investors[id].referId;
        uint256 height = 0;
        while (referId != 0 && height < 100) {
            investors[referId].achievement = investors[referId].achievement.add(value);
            referId = investors[referId].referId;
            height++;
        }
        
        _recommendProfit(investors[id].referId, value);
        _communityProfit(id, value);
    }

    function _levelInfo(uint256 id) private view returns (uint256, uint256, uint256) {
        uint256 amount = investors[id].amount;
        if (amount >= LEVEL_5) {
            return (5, 50, 70);
        } else if (amount >= LEVEL_4) {
            return (4, 45, 65);
        } else if (amount >= LEVEL_3) {
            return (3, 40, 60);
        } else if (amount >= LEVEL_2) {
            return (2, 35, 55);
        } else if (amount >= LEVEL_1) {
            return (1, 30, 50);
        }
        return (0, 0, 0);
    }

    function _staticProfot(uint256 id) private {
        _payProfit(id, (now / ONEDAY).sub(investors[id].drawTimestamp / ONEDAY).mul(investors[id].amount.mul(3).div(1000)), 0);
    }

    function _recommendProfit(uint256 referId, uint256 amount) private {
        if (referId == 0) {
            return;
        }

        (,,uint256 rate) = _levelInfo(referId);
        _payProfit(referId, amount.mul(rate).div(1000), 3);
    }
    
    //TODO 
    function _communityLevel(uint256 id) private view returns(uint256) {
        if (investors[id].directNodeNum >= 30 && investors[id].allNodeNum >= 500 &&
            investors[id].achievement >= 500 * 300 * 1e18) {
            return 3;
        } else if (investors[id].directNodeNum >= 20 && investors[id].allNodeNum >= 300 &&
            investors[id].achievement >= 300 * 300 * 1e18) {
            return 2;
          } else if (investors[id].directNodeNum >= 10 && investors[id].allNodeNum >= 100 &&
            investors[id].achievement >= 100 * 300 * 1e18) {
            return 1;
        }            
    }
    
    function _communityProfit(uint256 id, uint256 amount) private {
        uint256 pid = investors[id].referId;
        uint256 height;
        uint256 level;


        uint256 eqRate;
        uint256 count;
        while (pid != 0 && height < 100) {

            uint256 currentLevel = _communityLevel(pid);
            if(currentLevel == 3 &&  investors[pid].achievement >= VIP) {
                count++;
            }
    
            if(level < 3) {
                if (currentLevel > level) {
                    (level, currentLevel) = (currentLevel, currentLevel - level);
                    eqRate = currentLevel;
                    _payProfit(pid, amount.mul(currentLevel) / 100, 2);
                } else if (currentLevel == level){
                    if(eqRate != 0) {
                        _payProfit(pid, amount.mul(eqRate) / 1000, 2);
                        eqRate = 0;
                    }
                }
            }
           
            pid = investors[pid].referId;
            height++;
        }

        if(count != 0) {
            pid = investors[id].referId;
            height = 0;
            while (pid != 0 && height < 100) {
                if (_communityLevel(pid) == 3 && investors[pid].achievement >= VIP) {
                     _payProfit(pid, amount / 100 /count, 2);
                }
                pid = investors[pid].referId;
                height++;
            }
        }
    }

    function _payProfit(uint id, uint256 profit, uint8 pType) private returns (uint256) {
        if (id == 0 || profit == 0) {
            return 0;
        }

        (,uint256 times,) = _levelInfo(id);
        uint256 totalProfit = investors[id].amount.mul(times).div(10);
        if (investors[id].returnAmount >= totalProfit) {
            return 0;
        }

        if (profit.add(investors[id].returnAmount) > totalProfit) {
            profit = totalProfit.sub(investors[id].returnAmount);
        }

        if (now / ONEDAY != investors[id].dynamicTimestamp / ONEDAY) {
            investors[id].nodeProfit = 0;
            investors[id].communityProfit = 0;
            investors[id].recommendProfit = 0;
            investors[id].dynamicTimestamp = now;
        }

        if (pType == 1) {
            investors[id].nodeProfit = investors[id].nodeProfit.add(profit);
        } else {
            if (pType == 2) {
                investors[id].communityProfit = investors[id].communityProfit.add(profit);
            } else if (pType == 3) {
                investors[id].recommendProfit = investors[id].recommendProfit.add(profit);
            } 
            
            //TODO test
            if (investors[investors[id].referId].directNodeNum >= 5 && 
                investors[investors[id].referId].achievement >= 5 * 300 * 1e18) {
                _payProfit(investors[id].referId, profit / 5, 1);
            }
        }

        investors[id].returnAmount = investors[id].returnAmount.add(profit);
        investors[id].canWithdrawAmount = investors[id].canWithdrawAmount.add(profit);

        return profit;
    }

    function swap(uint256 value, string memory tokenA, string memory tokenB, uint256 mixRetValue) private returns (uint256 ret) {
        bytes32 key = hashKey(strings._stringToBytes32(tokenA), strings._stringToBytes32(tokenB));
        sero_setCallValues(tokenA, value, "", bytes32(0));
        ret = dex.swap(key, mixRetValue, now + 1, address(0));
        require(ret > 0);
    }

    function hashKey(bytes32 tokenA, bytes32 tokenB) private pure returns (bytes32) {
        require(tokenA != tokenB, 'same token');
        (bytes32 token0, bytes32 token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        return keccak256(abi.encode(token0, token1));
    }
    
    function exchange(string memory tokenA,string memory tokenB, uint256 sendValue,  uint256 mixRetValue) public onlyOwner returns(uint256 value) {
        value = swap(sendValue, tokenA, tokenB, mixRetValue);
    }
}



