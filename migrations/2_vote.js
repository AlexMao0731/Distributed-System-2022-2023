const Vote = artifacts.require("voteing_system");

module.exports = function (deployer) {
  deployer.deploy(Vote);
};
