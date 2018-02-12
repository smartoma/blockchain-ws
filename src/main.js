const SHA256 = require("crypto-js/sha256");
const moment = require("moment");

class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = moment().format();
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
      //TODO
      return '';
    }
}


class Blockchain{
    constructor() {
        this.chain = [Blockchain.createGenesisBlock()];
    }

    static createGenesisBlock() {
        return new Block(0, "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
      //TODO
    }

    isChainValid() {
      //TODO
        return true;
    }

    printOut() {
      console.log(JSON.stringify(this, null, 2));
    }
}

let myChain = new Blockchain();
myChain.addBlock(new Block(1, { amount: 4 }));
myChain.addBlock(new Block(2, { amount: 8 }));


console.log('Is Blockchain valid ? ' + myChain.isChainValid());
console.log('Changing a block...');
myChain.chain[1].data = { amount: 100 };
// myChain.chain[1].hash = myChain.chain[1].calculateHash();

console.log("Is Blockchain valid ? " + myChain.isChainValid());
myChain.printOut();