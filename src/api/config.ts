export const address: string = "3YbxBSTWhUGCdWYyBbxitYF8FAJ6QxedZoNQYymkT6vs6Dh2DddcHmv8itRoTQ8ZaqQ3LZ61W1hsfboSWCrg4yR8";
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