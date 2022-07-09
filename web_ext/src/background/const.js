const availableChainIds = Object.freeze(["mainnet", "testnet10"]);
const events = Object.freeze({
  chainChanged: "chainChanged",
  accountChanged: "accountChanged",
});
const MempoolInclusionStatus = Object.freeze({
  SUCCESS: 1,
  PENDING: 2,
  FAILED: 3,
});
const APIs = {};
