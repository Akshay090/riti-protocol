//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
// import "hardhat/console.sol";

/**
 * @author thesmallstar && Akshay090
 */
contract RitiProtocol {
	// State Variables
	address public immutable owner;

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

	constructor(address _owner) {
		owner = _owner;
	}

	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function createRiti(Config memory _config) public {
		Riti storage riti = ritis[idCounter++];
		riti.state.status = Status.AcceptingUsers;
		riti.config = _config;
		riti.config.lastUpdated = riti.config.startTime;
		riti.state.refreshCount = 0;
	}

	function joinRiti(uint256 _ritiId, UserInfo memory _userInfo) public payable {
		if(msg.value != ritis[_ritiId].config.stakeAmount) {
			// comment for testing.
			revert("Incorrect amount");
		}
		
		Riti storage riti = ritis[_ritiId];
		require(
			riti.state.status == Status.AcceptingUsers,
			"Riti is not accepting users"
		);
		riti.userInfo.push(_userInfo);
		userRitis[_userInfo.userAddress].push(_ritiId);
	}

	function getRiti(uint256 _id) public view returns (Riti memory) {
		return ritis[_id];
	}

	function getUserRitis(
		address userAddress
	) public view returns (Riti[] memory) {
		uint256[] memory ritiIds = userRitis[userAddress];
		Riti[] memory ritiArray = new Riti[](ritiIds.length);
		for (uint256 i = 0; i < ritiIds.length; i++) {
			ritiArray[i] = getRiti(ritiIds[i]);
		}
		return ritiArray;
	}

	function refreshRiti(UpdateRitiRequest calldata request) public {

		Riti storage riti = ritis[request.ritiId];

		if(riti.state.status == Status.Ended) {
			revert("Riti has ended already"); 
		}

		// we run riti if current time is startTime 
		// if(block.timestamp >= ritis[_ritiId].config.startTime) {
		// 	ritis[_ritiId].state.status = Status.Running;
		// }

		// dummy condition, to start riti remove later.
		if(block.timestamp >= 0) {
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

		if(request.data.completionStatus.length != riti.userInfo.length) {
			revert("Data provider is not for all users in this riti");
		}

		for(uint256 i = 0; i < request.data.completionStatus.length; i++) {
			bool isUserPartOfRiti = false;
			for(uint256 j = 0; j < riti.userInfo.length; j++) {
				if(request.data.completionStatus[i].userAddress == riti.userInfo[j].userAddress) {
					isUserPartOfRiti = true;
					break;
				}
			}
			if(!isUserPartOfRiti) {
				revert("User is not part of this riti");
			}
		}

		riti.state.ritiCompletions.push(request.data);
		
		riti.config.lastUpdated = riti.config.lastUpdated + 1 days; // dummy logic, to update.
		riti.state.refreshCount++;

		if(riti.state.refreshCount == riti.config.maxRefreshCount) {
			riti.state.status = Status.Ended;
		} else {
			return; 
		}

		// transfer earnings
		UserEarning[] memory earnings = getEarningsForAllUsersInRiti(riti.id);
		for(uint256 i = 0; i < earnings.length; i++) {
			payable(earnings[i].userAddress).transfer(earnings[i].earning);
		}
	}

	function getEarningsForAllUsersInRiti(uint256 _ritiId) public view returns (UserEarning[] memory) {
		Riti storage riti = ritis[_ritiId];
		UserEarning[] memory earnings = new UserEarning[](riti.userInfo.length);

		uint256 totalScore = 0;
		for(uint256 i = 0; i < riti.userInfo.length; i++) {
			totalScore += getScoreForUserInRiti(_ritiId, riti.userInfo[i].userAddress);
		}

		for(uint256 i = 0; i < riti.userInfo.length; i++) {
			earnings[i] = UserEarning(
				riti.userInfo[i].userAddress, 
				getUsersEarningForRiti(_ritiId, totalScore, riti.userInfo[i].userAddress)
			);
		}

		return earnings;
	}

	function getUsersEarningForRiti(uint256 _ritiId, uint256 totalScore, address userAddress) public view returns (uint256) {
		Riti storage riti = ritis[_ritiId];
		uint256 totalAmount = riti.config.stakeAmount * riti.userInfo.length;

		return totalAmount * getScoreForUserInRiti(_ritiId, userAddress) / totalScore;
	}

	function getScoresForRiti(uint256 _ritiId) public view returns (UserScore[] memory) {
		Riti storage riti = ritis[_ritiId];
		UserScore[] memory scores = new UserScore[](riti.userInfo.length);
		for(uint256 i = 0; i < riti.userInfo.length; i++) {
			scores[i] = UserScore(riti.userInfo[i].userAddress, getScoreForUserInRiti(_ritiId, riti.userInfo[i].userAddress));
		}
		return scores;
	}

	function getScoreForUserInRiti(uint256 _ritiId, address _userAddress) public view returns (uint256) {
		Riti storage riti = ritis[_ritiId];
		uint256 rank = 0;
		for(uint256 i = 0; i < riti.state.ritiCompletions.length; i++) {
			for(uint256 j = 0; j < riti.state.ritiCompletions[i].completionStatus.length; j++) {
				if(
					riti.state.ritiCompletions[i].completionStatus[j].isComplete && 
					riti.state.ritiCompletions[i].completionStatus[j].userAddress == _userAddress) {
					rank++;
					break;
				}
			}
		}
		
		return rank;
	}

	// function to get Users Addresses by Ritis
	function getUserAddressesByRitis(uint256 _ritiId) public view returns (address[] memory) {
		Riti storage riti = ritis[_ritiId];
		address[] memory userAddresses = new address[](riti.userInfo.length);
		for(uint256 i = 0; i < riti.userInfo.length; i++) {
			userAddresses[i] = riti.userInfo[i].userAddress;
		}
		return userAddresses;
	}

	
}