export const address: string = "3VN5XsbGsgh4XS37HZSEcLQf5DD9fuNiv4JiHUyCwfjRbJSxgZyN1xvN9VxgbonjUNZ2JuRUJy4R2sK237HkHD7F";
export const abi: any = [
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
	}
]