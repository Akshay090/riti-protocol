import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *      address: "0x...",
 *      abi: [...],
 *    }
 * } as const;
 */
const externalContracts = {
  80001: {
    FunctionsConsumer: {
      address: "0xe2fF76F6b7EF816cDa9fe758Cfa00B44D52a643D",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "router",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "_donId",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "EmptyArgs",
          type: "error",
        },
        {
          inputs: [],
          name: "EmptySource",
          type: "error",
        },
        {
          inputs: [],
          name: "NoInlineSecrets",
          type: "error",
        },
        {
          inputs: [],
          name: "OnlyRouterCanFulfill",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
          ],
          name: "OwnershipTransferRequested",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "id",
              type: "bytes32",
            },
          ],
          name: "RequestFulfilled",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "id",
              type: "bytes32",
            },
          ],
          name: "RequestSent",
          type: "event",
        },
        {
          inputs: [],
          name: "acceptOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
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
                  internalType: "enum FunctionsConsumer.RefreshFrequency",
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
                  internalType: "struct FunctionsConsumer.PlatformConfig",
                  name: "platformConfig",
                  type: "tuple",
                },
              ],
              internalType: "struct FunctionsConsumer.Config",
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
          inputs: [],
          name: "donId",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
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
          name: "getEarningsForAllUsersInRiti",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "earning",
                  type: "uint256",
                },
              ],
              internalType: "struct FunctionsConsumer.UserEarning[]",
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
                  internalType: "struct FunctionsConsumer.UserInfo[]",
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
                      internalType: "enum FunctionsConsumer.RefreshFrequency",
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
                      internalType: "struct FunctionsConsumer.PlatformConfig",
                      name: "platformConfig",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct FunctionsConsumer.Config",
                  name: "config",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "enum FunctionsConsumer.Status",
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
                          internalType: "struct FunctionsConsumer.UserRitiInformation[]",
                          name: "completionStatus",
                          type: "tuple[]",
                        },
                      ],
                      internalType: "struct FunctionsConsumer.RitiCompletionData[]",
                      name: "ritiCompletions",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct FunctionsConsumer.State",
                  name: "state",
                  type: "tuple",
                },
              ],
              internalType: "struct FunctionsConsumer.Riti",
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
          name: "getScoreForUserInRiti",
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
          name: "getScoresForRiti",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "score",
                  type: "uint256",
                },
              ],
              internalType: "struct FunctionsConsumer.UserScore[]",
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
          ],
          name: "getUserAddressesByRitis",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
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
                  internalType: "struct FunctionsConsumer.UserInfo[]",
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
                      internalType: "enum FunctionsConsumer.RefreshFrequency",
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
                      internalType: "struct FunctionsConsumer.PlatformConfig",
                      name: "platformConfig",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct FunctionsConsumer.Config",
                  name: "config",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "enum FunctionsConsumer.Status",
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
                          internalType: "struct FunctionsConsumer.UserRitiInformation[]",
                          name: "completionStatus",
                          type: "tuple[]",
                        },
                      ],
                      internalType: "struct FunctionsConsumer.RitiCompletionData[]",
                      name: "ritiCompletions",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct FunctionsConsumer.State",
                  name: "state",
                  type: "tuple",
                },
              ],
              internalType: "struct FunctionsConsumer.Riti[]",
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
              internalType: "uint256",
              name: "totalScore",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
          ],
          name: "getUsersEarningForRiti",
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
              internalType: "bytes32",
              name: "requestId",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "response",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "err",
              type: "bytes",
            },
          ],
          name: "handleOracleFulfillment",
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
              internalType: "struct FunctionsConsumer.UserInfo",
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
                      internalType: "struct FunctionsConsumer.UserRitiInformation[]",
                      name: "completionStatus",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct FunctionsConsumer.RitiCompletionData",
                  name: "data",
                  type: "tuple",
                },
              ],
              internalType: "struct FunctionsConsumer.UpdateRitiRequest",
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
                  internalType: "enum FunctionsConsumer.RefreshFrequency",
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
                  internalType: "struct FunctionsConsumer.PlatformConfig",
                  name: "platformConfig",
                  type: "tuple",
                },
              ],
              internalType: "struct FunctionsConsumer.Config",
              name: "config",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "enum FunctionsConsumer.Status",
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
                      internalType: "struct FunctionsConsumer.UserRitiInformation[]",
                      name: "completionStatus",
                      type: "tuple[]",
                    },
                  ],
                  internalType: "struct FunctionsConsumer.RitiCompletionData[]",
                  name: "ritiCompletions",
                  type: "tuple[]",
                },
              ],
              internalType: "struct FunctionsConsumer.State",
              name: "state",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_lastError",
          outputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_lastRequestId",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_lastResponse",
          outputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "source",
              type: "string",
            },
            {
              internalType: "enum FunctionsRequest.Location",
              name: "secretsLocation",
              type: "uint8",
            },
            {
              internalType: "bytes",
              name: "encryptedSecretsReference",
              type: "bytes",
            },
            {
              internalType: "string[]",
              name: "args",
              type: "string[]",
            },
            {
              internalType: "bytes[]",
              name: "bytesArgs",
              type: "bytes[]",
            },
            {
              internalType: "uint64",
              name: "subscriptionId",
              type: "uint64",
            },
            {
              internalType: "uint32",
              name: "callbackGasLimit",
              type: "uint32",
            },
          ],
          name: "sendRequest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "newDonId",
              type: "bytes32",
            },
          ],
          name: "setDonId",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
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
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
