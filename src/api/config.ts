export const address: string = "3Y7qm4UkqBd58k1tnNVihg3kg2H5W85GZHsnZhNoTNrDkstDjud1jKztXs3ZJXNNGhiivQaryaXS6uTmDGypxBWG";
export const abi: any =[
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
						"name": "nodeProfid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "communityProfid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "staticTimestamp",
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
				"internalType": "string",
				"name": "referCode",
				"type": "string"
			}
		],
		"name": "invest",
		"outputs": [],
		"stateMutability": "payable",
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
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]