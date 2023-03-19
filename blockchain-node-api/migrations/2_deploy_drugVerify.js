const drugVerify = artifacts.require("./drugVerify.sol");

module.exports = function(deployer) {
  deployer.deploy(drugVerify);
};