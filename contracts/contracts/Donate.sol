// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract Donate {
    // Event to call when someone donates money
    event NewDonation( 
        address indexed from,
        uint256 time,
        string name,
        string message
        
    );

    // Donation struct
    struct Donation {
        address from;
        uint256 time;
        string name;
        string message;
    }

    // List of all donations received
    Donation[] donations;

    // address of the contract deployer
    address payable owner;  

    // Deploy logic
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Function to donate money
     * @param _name Name of the donor
     * @param _message Message from the donor
     */
    function sendMoney(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "You need to send some ether");

        donations.push(Donation(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // emit a log event when someone donates money
        emit NewDonation(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev Function to get all donations
     * @return Donation[] List of all donations
     */
    function getDonatios() public view returns(Donation[] memory) {
        return donations;
    }
}