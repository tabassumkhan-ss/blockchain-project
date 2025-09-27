// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Registration {
    struct BasicInfo {
        string mobile;
        string aadhaar;
        string fullName;
        string email;
    }

    struct AddressInfo {
        string country;
        string state;
        string city;
        string address1;
        string address2;
        string pincode;
    }

    struct KycInfo {
        string referral;
        string pan;
    }

    struct Profile {
        BasicInfo basic;
        AddressInfo addr;
        KycInfo kyc;
        uint256 registeredAt;
    }

    uint256 public userCount;
    uint256[] public allUserIds; // store all user IDs

    /// 🔹 mapping is PUBLIC again, so Remix auto-creates `profiles(uint256)`
    mapping(uint256 => Profile) public profiles; // id → Profile

    mapping(address => uint256[]) public addressToUserIds; // wallet → list of userIds

    /// 🔹 Event emitted when a user registers
    event UserRegistered(uint256 indexed userId, address indexed user);

    // 🔹 Register a new user
    function registerProfile(
        BasicInfo memory basic,
        AddressInfo memory addr,
        KycInfo memory kyc
    ) public {
        userCount++;
        uint256 newId = userCount;

        profiles[newId] = Profile(basic, addr, kyc, block.timestamp);
        allUserIds.push(newId);
        addressToUserIds[msg.sender].push(newId);

        emit UserRegistered(newId, msg.sender);
    }

    // 🔹 Fetch all profiles for a wallet
    function getProfilesByWallet(address user)
        public
        view
        returns (Profile[] memory)
    {
        uint256[] memory ids = addressToUserIds[user];
        Profile[] memory result = new Profile[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = profiles[ids[i]];
        }
        return result;
    }

    // 🔹 Update profile by ID
    function updateProfileById(
        uint256 id,
        BasicInfo memory basic,
        AddressInfo memory addr,
        KycInfo memory kyc
    ) public {
        require(id > 0 && id <= userCount, "Invalid ID");
        profiles[id] = Profile(basic, addr, kyc, block.timestamp);
    }

    // 🔹 Get all registered User IDs
    function getAllUserIds() public view returns (uint256[] memory) {
        return allUserIds;
    }
}