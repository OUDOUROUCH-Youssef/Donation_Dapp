// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract CharityDonation {
    struct Cause {
        string name;
        string description;
        uint256 totalDonations;
        bool isActive;
    }
    
    mapping(uint256 => Cause) public causes;
    uint256 public causeCount;
    address public owner;
    
    event DonationMade(uint256 indexed causeId, address indexed donor, uint256 amount);
    event CauseAdded(uint256 indexed causeId, string name);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Seul le proprietaire peut effectuer cette action");
        _;
    }
    
    function addCause(string memory _name, string memory _description) public onlyOwner {
        causeCount++;
        causes[causeCount] = Cause({
            name: _name,
            description: _description,
            totalDonations: 0,
            isActive: true
        });
        
        emit CauseAdded(causeCount, _name);
    }
    
    function makeDonation(uint256 _causeId) public payable {
        require(_causeId > 0 && _causeId <= causeCount, "Cause invalide");
        require(causes[_causeId].isActive, "Cette cause n'est plus active");
        require(msg.value > 0, "Le montant du don doit etre superieur a 0");
        
        causes[_causeId].totalDonations += msg.value;
        
        emit DonationMade(_causeId, msg.sender, msg.value);
    }
    
    function getCause(uint256 _causeId) public view returns (
        string memory name,
        string memory description,
        uint256 totalDonations,
        bool isActive
    ) {
        require(_causeId > 0 && _causeId <= causeCount, "Cause invalide");
        Cause storage cause = causes[_causeId];
        return (
            cause.name,
            cause.description,
            cause.totalDonations,
            cause.isActive
        );
    }
    
    function toggleCauseStatus(uint256 _causeId) public onlyOwner {
        require(_causeId > 0 && _causeId <= causeCount, "Cause invalide");
        causes[_causeId].isActive = !causes[_causeId].isActive;
    }
}