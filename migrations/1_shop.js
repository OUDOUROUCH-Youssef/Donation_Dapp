const MyContract = artifacts.require("CharityDonation");

module.exports = function (deployer) {
  deployer.deploy(MyContract);
};
