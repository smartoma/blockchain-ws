const SHA256 = require("crypto-js/sha256");
const moment = require("moment");

class Block {
  constructor(index, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = moment().format();
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    const startTime = new Date().getTime();
    //TODO
    console.log(`BLOCK MINED in ${(new Date().getTime() - startTime) / 1000} seconds: ${this.hash}`);
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock() {
    return new Block(0, "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
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
    console.log(JSON.stringify(this, null, 2));
  }
}

let myChain = new Blockchain();
console.log('Mining block 1...');
myChain.addBlock(new Block(1, {amount: 4}));

console.log('Mining block 2...');
myChain.addBlock(new Block(2, {amount: 8}));

console.log('Mining block 3...');
myChain.addBlock(new Block(3, {amount: 5}));

myChain.printOut();
console.log('Chain validity is: ' + myChain.isChainValid());