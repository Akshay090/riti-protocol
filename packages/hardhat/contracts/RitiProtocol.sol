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

	uint256 private idCounter;

	struct Riti {
		uint256 id;
		UserInfo[] userInfo;
		Config config;
		State state;
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
	    uint256 refreshCount;
		RefreshFrequency frequency;
		PlatformConfig platformConfig;
	}

	struct State {
		Status status;
		uint256 amount;
	}

	constructor(address _owner) {
		owner = _owner;
	}

	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function createRiti(
		Config memory _config
		) public {

		Riti storage riti = ritis[idCounter++];
		riti.state.status = Status.AcceptingUsers;
		riti.config = _config;
	}

	function joinRiti(
		uint256 _id,
		UserInfo memory _userInfo
		) public {

		Riti storage riti = ritis[_id];
		require(riti.state.status == Status.AcceptingUsers, "Riti is not accepting users");
		riti.userInfo.push(_userInfo);
		userRitis[_userInfo.userAddress].push(_id);
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


	

	// write create riti function



	// 1. Create Riti
	// 2. Join Riti
	// 3. Refresh Riti

}


