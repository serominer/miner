export const address: string = "5iATmvSmd6W9RN7yv8Q7qjnFtBVxiTJ6ddqCJhja5fqoiVS2MmoXgeF2iZkRstAYDHEeUqyW1J1k61MumpV7PiW8";
export const abi: any = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_swap",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_markets",
				"type": "address[]"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BASETOKEN",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addrToId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			}
		],
		"name": "decode",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "details",
		"outputs": [
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "referCode",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "referId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "returnAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "canWithdrawAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "directNodeNum",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "allNodeNum",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "achievement",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recommendProfit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "nodeProfit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "communityProfit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dynamicTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "drawTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "redeeming",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "redeemTime",
						"type": "uint256"
					}
				],
				"internalType": "struct FeroMiner.Investor",
				"name": "investor",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "number",
				"type": "uint64"
			}
		],
		"name": "encode",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "end",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenA",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenB",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "sendValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mixRetValue",
				"type": "uint256"
			}
		],
		"name": "exchange",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "referCode",
				"type": "string"
			}
		],
		"name": "invest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "investors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "referId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "returnAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "canWithdrawAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "directNodeNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "allNodeNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "achievement",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recommendProfit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nodeProfit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "communityProfit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dynamicTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "drawTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "redeeming",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "redeemTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "redeem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "registerNode",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "baseToken",
				"type": "string"
			}
		],
		"name": "setBaseToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_swap",
				"type": "address"
			}
		],
		"name": "setSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "currency",
				"type": "string"
			}
		],
		"name": "withdrawBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]