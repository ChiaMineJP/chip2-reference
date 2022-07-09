function Coin(parent_coin_info, puzzle_hash, amount){
  this.parent_coin_info = parent_coin_info;
  this.puzzle_hash = puzzle_hash;
  this.amount = amount;
}

function CoinSpend(coin, puzzle_reveal, solution){
  this.coin = coin;
  this.puzzle_reveal = puzzle_reveal;
  this.solution = solution;
}

function SpendBundle(coin_spends, aggregated_signature){
  this.coin_spends = coin_spends;
  this.aggregated_signature = aggregated_signature;
}

function GetAssetCoinsParams(type, assetId, includedLocked, startHeight, limit){
  this.type = type;
  this.assetId = assetId;
  this.includedLocked = includedLocked;
  this.startHeight = startHeight;
  this.limit = limit;
}

function LineageProof(parentName, innerPuzzleHash, amount){
  this.parentName = parentName;
  this.innerPuzzleHash = innerPuzzleHash;
  this.amount = amount;
}

function SpendableCoin(coin, coinName, puzzle, confirmedBlockIndex, locked, lineageProof){
  this.coin = coin;
  this.coinName = coinName;
  this.puzzle = puzzle;
  this.confirmedBlockIndex = confirmedBlockIndex;
  this.locked = locked;
  this.lineageProof = lineageProof;
}

function AssetBalanceResp(confirmed, spendable, spendableCoinCount){
  this.confirmed = confirmed;
  this.spendable = spendable;
  this.spendableCoinCount = spendableCoinCount;
}

function SendTransactionParams(spendBundle){
  this.spendBundle = spendBundle;
}

function TransactionResp(status, error){
  this.status = status;
  this.error = error;
}

function Error(code, message, data){
  this.code = code;
  this.message = message;
  this.data = data;
}

const invalidParamsError = Object.freeze(new Error(4000, "invalidParams"));
const unauthorizedError = Object.freeze(new Error(4001, "unauthorized"));
const userRejectedRequestError = Object.freeze(new Error(4002, "userRejectedRequest"));
const spendableBalanceExceeded = Object.freeze(new Error(4003, "spendableBalanceExceeded"));
const limitExceeded = Object.freeze(new Error(4029, "limitExceeded"));
