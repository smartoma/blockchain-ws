const SHA256 = require("crypto-js/sha256");
const moment = require("moment");
const Transaction = require("./transaction");

class Block {
  constructor(transactions, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = moment().format();
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    const startTime = new Date().getTime();

    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`BLOCK MINED in ${(new Date().getTime() - startTime) / 1000} seconds: ${this.hash}`);
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block([], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    //TODO
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    //TODO
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  printOut() {
    console.log(JSON.stringify(this.chain, null, 2));
  }
}

let myChain = new Blockchain();
myChain.createTransaction(new Transaction('address1', 'address2', 100));
myChain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
myChain.minePendingTransactions('my-address');
myChain.printOut();

console.log('Balance of my address is', myChain.getBalanceOfAddress('my-address'));

console.log('\n Starting the miner again...');
myChain.minePendingTransactions('my-address');
myChain.printOut();

console.log('\nBalance of my-address is', myChain.getBalanceOfAddress('my-address'));
