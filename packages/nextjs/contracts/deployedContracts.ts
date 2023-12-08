/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    RitiProtocol: {
      address: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "lastUpdated",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxRefreshCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "enum RitiProtocol.RefreshFrequency",
                  name: "frequency",
                  type: "uint8",
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "platformName",
                      type: "string",
                    },
                  ],
                  internalType: "struct RitiProtocol.PlatformConfig",
                  name: "platformConfig",
                  type: "tuple",
                },
              ],
              internalType: "struct RitiProtocol.Config",
              name: "_config",
              type: "tuple",
            },
          ],
          name: "createRiti",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_ritiId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_userAddress",
              type: "address",
            },
          ],
          name: "getRankForUserInRiti",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_ritiId",
              type: "uint256",
            },
          ],
          name: "getRanksForRiti",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "getRiti",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "platformUsername",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "userAddress",
                      type: "address",
                    },
                  ],
                  internalType: "struct RitiProtocol.UserInfo[]",
                  name: "userInfo",
                  type: "tuple[]",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "lastUpdated",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxRefreshCount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "stakeAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "enum RitiProtocol.RefreshFrequency",
                      name: "frequency",
                      type: "uint8",
                    },
                    {
                      components: [
                        {
                          internalType: "string",
                          name: "platformName",
                          type: "string",
                        },
                      ],
                      internalType: "struct RitiProtocol.PlatformConfig",
                      name: "platformConfig",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct RitiProtocol.Config",
                  name: "config",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "enum RitiProtocol.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "refreshCount",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "uint256",
                          name: "dataCollectionTimestamp",
                          type: "uint256",
                        },
                        {
                          components: [
                            {
                              internalType: "address",
                              name: "userAddress",
                              type: "address",
                            },
                            {
                              internalType: "bool",
                              name: "isComplete",
                              type: "bool",
                            },
                          ],
                          internalType: "struct RitiProtocol.UserRitiInformation[]",
                          name: "completionStatus",
                          type: "tuple[]",
                        },
                      ],
                      internalType: "struct RitiProtocol.RitiCompletionData[]",
                      name: "ritiCompletions",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct RitiProtocol.State",
                  name: "state",
                  type: "tuple",
                },
              ],
              internalType: "struct RitiProtocol.Riti",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
          ],
          name: "getUserRitis",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "platformUsername",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "userAddress",
                      type: "address",
                    },
                  ],
                  internalType: "struct RitiProtocol.UserInfo[]",
                  name: "userInfo",
                  type: "tuple[]",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "lastUpdated",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxRefreshCount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "stakeAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "enum RitiProtocol.RefreshFrequency",
                      name: "frequency",
                      type: "uint8",
                    },
                    {
                      components: [
                        {
                          internalType: "string",
                          name: "platformName",
                          type: "string",
                        },
                      ],
                      internalType: "struct RitiProtocol.PlatformConfig",
                      name: "platformConfig",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct RitiProtocol.Config",
                  name: "config",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "enum RitiProtocol.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "refreshCount",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "uint256",
                          name: "dataCollectionTimestamp",
                          type: "uint256",
                        },
                        {
                          components: [
                            {
                              internalType: "address",
                              name: "userAddress",
                              type: "address",
                            },
                            {
                              internalType: "bool",
                              name: "isComplete",
                              type: "bool",
                            },
                          ],
                          internalType: "struct RitiProtocol.UserRitiInformation[]",
                          name: "completionStatus",
                          type: "tuple[]",
                        },
                      ],
                      internalType: "struct RitiProtocol.RitiCompletionData[]",
                      name: "ritiCompletions",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct RitiProtocol.State",
                  name: "state",
                  type: "tuple",
                },
              ],
              internalType: "struct RitiProtocol.Riti[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_ritiId",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "string",
                  name: "platformUsername",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
              ],
              internalType: "struct RitiProtocol.UserInfo",
              name: "_userInfo",
              type: "tuple",
            },
          ],
          name: "joinRiti",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "ritiId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "dataCollectionTimestamp",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "userAddress",
                          type: "address",
                        },
                        {
                          internalType: "bool",
                          name: "isComplete",
                          type: "bool",
                        },
                      ],
                      internalType: "struct RitiProtocol.UserRitiInformation[]",
                      name: "completionStatus",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct RitiProtocol.RitiCompletionData",
                  name: "data",
                  type: "tuple",
                },
              ],
              internalType: "struct RitiProtocol.UpdateRitiRequest",
              name: "request",
              type: "tuple",
            },
          ],
          name: "refreshRiti",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "ritis",
          outputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "lastUpdated",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxRefreshCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "enum RitiProtocol.RefreshFrequency",
                  name: "frequency",
                  type: "uint8",
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "platformName",
                      type: "string",
                    },
                  ],
                  internalType: "struct RitiProtocol.PlatformConfig",
                  name: "platformConfig",
                  type: "tuple",
                },
              ],
              internalType: "struct RitiProtocol.Config",
              name: "config",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "enum RitiProtocol.Status",
                  name: "status",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "refreshCount",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "dataCollectionTimestamp",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "userAddress",
                          type: "address",
                        },
                        {
                          internalType: "bool",
                          name: "isComplete",
                          type: "bool",
                        },
                      ],
                      internalType: "struct RitiProtocol.UserRitiInformation[]",
                      name: "completionStatus",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct RitiProtocol.RitiCompletionData[]",
                  name: "ritiCompletions",
                  type: "tuple[]",
                },
              ],
              internalType: "struct RitiProtocol.State",
              name: "state",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "userRitis",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
