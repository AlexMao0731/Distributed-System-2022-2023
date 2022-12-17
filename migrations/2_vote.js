const Vote = artifacts.require("voting_system");

module.exports = function (deployer) {
  deployer.deploy(Vote);
};
