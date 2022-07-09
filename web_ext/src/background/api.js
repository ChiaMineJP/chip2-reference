/**
 * @returns {string} - Return the current chainID
 */
defineMethod(async function chainId(params){
  //@TODO Not implemented yet
  return stateManager.getChainId();
});

/**
 * @returns {boolean} true if dAp has been approved
 */
defineMethod(async function connect(params){
  //@TODO Not implemented yet
  return true;
});

defineMethod(async function walletSwitchChain(params){
  //@TODO Not implemented yet
  const {chainId} = params;
  if(!availableChainIds.includes(chainId)){
    throw new Error(`Unknown chainId: ${chainId}`);
  }
  stateManager.setChainId(chainId);
  return chainId;
});

defineMethod(async function getPublicKeys(params){
  //@TODO Not implemented yet
  const {limit, offset} = params;
  return [];
});

defineMethod(async function filterUnlockedCoins(params){
  //@TODO Not implemented yet
  const {coinNames} = params;
  return [];
});

defineMethod(async function getAssetCoins(params){
  //@TODO Not implemented yet
  const {type, assetId, includedLocked, startHeight, limit} = params;
  return [
    new SpendableCoin(new Coin("", "", 0), "", "", 0, false, new LineageProof()),
  ];
});

defineMethod(async function getAssetBalance(params){
  //@TODO Not implemented yet
  const {type, assetId} = params;
  return new AssetBalanceResp("", "", 0);
});

defineMethod(async function signCoinSpends(params){
  //@TODO Not implemented yet
  const {coinSpends} = params;
  return "";
});

defineMethod(async function signMessage(params){
  //@TODO Not implemented yet
  const {message, publicKey} = params;
  return "";
});

defineMethod(async function sendTransaction(params){
  //@TODO Not implemented yet
  const {spendBundle} = params;
  return [
    new TransactionResp(MempoolInclusionStatus.SUCCESS, undefined),
  ];
});
