import { AbiItem } from 'web3-utils';

export const abis: AbiItem[] = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "comment",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "NewComment",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "UpdatedComment",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "comment",
                "type": "string"
            }
        ],
        "name": "addComment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "loveComment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getComments",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "comment",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address[]",
                        "name": "lovedUsers",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct MyMileage.Comment[]",
                "name": "_comments",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];