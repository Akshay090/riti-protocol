// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title Chainlink Functions example on-demand consumer contract example
 */
contract FunctionsConsumer is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;

  // CHAINLINK -START

  bytes32 public donId; // DON ID for the Functions DON to which the requests are sent

  bytes32 public s_lastRequestId;
  bytes public s_lastResponse;
  bytes public s_lastError;

  // debug counter
  uint256 public count;

  constructor(address router, bytes32 _donId) FunctionsClient(router) ConfirmedOwner(msg.sender) {
    donId = _donId;
  }

  /**
   * @notice Set the DON ID
   * @param newDonId New DON ID
   */
  function setDonId(bytes32 newDonId) external onlyOwner {
    donId = newDonId;
  }

  /**
   * @notice Triggers an on-demand Functions request using remote encrypted secrets
   * @param source JavaScript source code
   * @param secretsLocation Location of secrets (only Location.Remote & Location.DONHosted are supported)
   * @param encryptedSecretsReference Reference pointing to encrypted secrets
   * @param args String arguments passed into the source code and accessible via the global variable `args`
   * @param bytesArgs Bytes arguments passed into the source code and accessible via the global variable `bytesArgs` as hex strings
   * @param subscriptionId Subscription ID used to pay for request (FunctionsConsumer contract address must first be added to the subscription)
   * @param callbackGasLimit Maximum amount of gas used to call the inherited `handleOracleFulfillment` method
   */
  function sendRequest(
    string calldata source,
    FunctionsRequest.Location secretsLocation,
    bytes calldata encryptedSecretsReference,
    string[] calldata args,
    bytes[] calldata bytesArgs,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) external onlyOwner {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
    req.secretsLocation = secretsLocation;
    req.encryptedSecretsReference = encryptedSecretsReference;

    if (args.length > 0) {
      // arg 0 is ritiId
      uint256 ritiId = uint256(keccak256(abi.encodePacked(args[0])));
      string[] memory userAddresses = getUserAddressesByRitis(ritiId);

    }
    // if (bytesArgs.length > 0) {
    //   req.setBytesArgs(bytesArgs);
    // }
    // debug counter  + 1
    count++;

    s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, callbackGasLimit, donId);
  }

  /**
   * @notice Store latest result/error
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    s_lastResponse = response;
    s_lastError = err;

    // debug counter  + 1
    count++;
  }

  // CHAINLINK - END

  // RITI - start

  // State Variables
  // Make a mapping between, riti ids and Riti
  mapping(uint256 => Riti) public ritis;

  // Make a mapping between, users and ritiIds
  mapping(address => uint256[]) public userRitis;

  struct UpdateRitiRequest {
    uint256 ritiId;
    RitiCompletionData data;
  }

  struct RitiCompletionData {
    uint256 dataCollectionTimestamp;
    UserRitiInformation[] completionStatus;
  }

  struct UserRitiInformation {
    address userAddress;
    bool isComplete;
  }

  uint256 private idCounter;

  struct Riti {
    uint256 id;
    UserInfo[] userInfo;
    Config config;
    State state;
  }

  struct UserScore {
    address userAddress;
    uint256 score;
  }

  struct UserEarning {
    address userAddress;
    uint256 earning;
  }

  enum RefreshFrequency {
    Day,
    Week,
    Month
  }

  enum Status {
    AcceptingUsers,
    Running,
    Ended,
    Aborted
  }

  struct PlatformConfig {
    string platformName;
  }

  struct UserInfo {
    string platformUsername;
    address userAddress;
  }

  struct Config {
    uint256 lastUpdated;
    uint256 startTime;
    uint256 maxRefreshCount;
    uint256 stakeAmount;
    RefreshFrequency frequency;
    PlatformConfig platformConfig;
  }

  struct State {
    Status status;
    uint256 refreshCount;
    RitiCompletionData[] ritiCompletions;
  }

  function createRiti(Config memory _config) public {
    Riti storage riti = ritis[idCounter++];
    riti.state.status = Status.AcceptingUsers;
    riti.config = _config;
    riti.config.lastUpdated = riti.config.startTime;
    riti.state.refreshCount = 0;
  }

  function joinRiti(uint256 _ritiId, UserInfo memory _userInfo) public payable {
    if (msg.value != ritis[_ritiId].config.stakeAmount) {
      // comment for testing.
      revert("Incorrect amount");
    }

    Riti storage riti = ritis[_ritiId];
    require(riti.state.status == Status.AcceptingUsers, "Riti is not accepting users");
    riti.userInfo.push(_userInfo);
    userRitis[_userInfo.userAddress].push(_ritiId);
  }

  function getRiti(uint256 _id) public view returns (Riti memory) {
    return ritis[_id];
  }

  function getUserRitis(address userAddress) public view returns (Riti[] memory) {
    uint256[] memory ritiIds = userRitis[userAddress];
    Riti[] memory ritiArray = new Riti[](ritiIds.length);
    for (uint256 i = 0; i < ritiIds.length; i++) {
      ritiArray[i] = getRiti(ritiIds[i]);
    }
    return ritiArray;
  }

  function refreshRiti(UpdateRitiRequest calldata request) public {
    Riti storage riti = ritis[request.ritiId];

    if (riti.state.status == Status.Ended) {
      revert("Riti has ended already");
    }

    // we run riti if current time is startTime
    // if(block.timestamp >= ritis[_ritiId].config.startTime) {
    // 	ritis[_ritiId].state.status = Status.Running;
    // }

    // dummy condition, to start riti remove later.
    if (block.timestamp >= 0) {
      riti.state.status = Status.Running;
    }

    // Validate data is in correct range.
    // if(riti.config.frequency == riti.config.frequency && request.dataCollectionTimestamp >= now - 1 days) {
    // 	riti.state.status = Status.Running;
    // } else if(timePeriod == TimePeriod.Week && request.dataCollectionTimestamp >= now - 1 weeks) {
    // 	riti.state.status = Status.Running;
    // }  else {
    // 	revert("Data collection timestamp is not within the correct range");
    // }

    // Validate: Data provider is for all users in this riti. There is not user who is not part of this riti.

    // match length of given data and riti user data

    if (request.data.completionStatus.length != riti.userInfo.length) {
      revert("Data provider is not for all users in this riti");
    }

    for (uint256 i = 0; i < request.data.completionStatus.length; i++) {
      bool isUserPartOfRiti = false;
      for (uint256 j = 0; j < riti.userInfo.length; j++) {
        if (request.data.completionStatus[i].userAddress == riti.userInfo[j].userAddress) {
          isUserPartOfRiti = true;
          break;
        }
      }
      if (!isUserPartOfRiti) {
        revert("User is not part of this riti");
      }
    }

    riti.state.ritiCompletions.push(request.data);

    riti.config.lastUpdated = riti.config.lastUpdated + 1 days; // dummy logic, to update.
    riti.state.refreshCount++;

    if (riti.state.refreshCount == riti.config.maxRefreshCount) {
      riti.state.status = Status.Ended;
    } else {
      return;
    }

    // transfer earnings
    UserEarning[] memory earnings = getEarningsForAllUsersInRiti(riti.id);
    for (uint256 i = 0; i < earnings.length; i++) {
      payable(earnings[i].userAddress).transfer(earnings[i].earning);
    }
  }

  function getEarningsForAllUsersInRiti(uint256 _ritiId) public view returns (UserEarning[] memory) {
    Riti storage riti = ritis[_ritiId];
    UserEarning[] memory earnings = new UserEarning[](riti.userInfo.length);

    uint256 totalScore = 0;
    for (uint256 i = 0; i < riti.userInfo.length; i++) {
      totalScore += getScoreForUserInRiti(_ritiId, riti.userInfo[i].userAddress);
    }

    for (uint256 i = 0; i < riti.userInfo.length; i++) {
      earnings[i] = UserEarning(
        riti.userInfo[i].userAddress,
        getUsersEarningForRiti(_ritiId, totalScore, riti.userInfo[i].userAddress)
      );
    }

    return earnings;
  }

  function getUsersEarningForRiti(
    uint256 _ritiId,
    uint256 totalScore,
    address userAddress
  ) public view returns (uint256) {
    Riti storage riti = ritis[_ritiId];
    uint256 totalAmount = riti.config.stakeAmount * riti.userInfo.length;

    return (totalAmount * getScoreForUserInRiti(_ritiId, userAddress)) / totalScore;
  }

  function getScoresForRiti(uint256 _ritiId) public view returns (UserScore[] memory) {
    Riti storage riti = ritis[_ritiId];
    UserScore[] memory scores = new UserScore[](riti.userInfo.length);
    for (uint256 i = 0; i < riti.userInfo.length; i++) {
      scores[i] = UserScore(riti.userInfo[i].userAddress, getScoreForUserInRiti(_ritiId, riti.userInfo[i].userAddress));
    }
    return scores;
  }

  function getScoreForUserInRiti(uint256 _ritiId, address _userAddress) public view returns (uint256) {
    Riti storage riti = ritis[_ritiId];
    uint256 rank = 0;
    for (uint256 i = 0; i < riti.state.ritiCompletions.length; i++) {
      for (uint256 j = 0; j < riti.state.ritiCompletions[i].completionStatus.length; j++) {
        if (
          riti.state.ritiCompletions[i].completionStatus[j].isComplete &&
          riti.state.ritiCompletions[i].completionStatus[j].userAddress == _userAddress
        ) {
          rank++;
          break;
        }
      }
    }

    return rank;
  }

  // function to get Users Addresses by Ritis
  function getUserAddressesByRitis(uint256 _ritiId) public view returns (string[] memory) {
    Riti storage riti = ritis[_ritiId];
    // address[] memory userAddresses = new address[](riti.userInfo.length);
    // make userAddresses array of string
    string[] memory userAddresses = new string[](riti.userInfo.length);
    for (uint256 i = 0; i < riti.userInfo.length; i++) {
      userAddresses[i] = riti.userInfo[i].platformUsername;
    }
    return userAddresses;
  }
  // RITI - END
}
