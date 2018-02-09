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
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
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
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
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
myChain.addBlock(new Block(1, { amount: 4 }));
myChain.addBlock(new Block(2, { amount: 8 }));


console.log('Is Blockchain valid ? ' + myChain.isChainValid());
console.log('Changing a block...');
myChain.chain[1].data = { amount: 100 };
// myChain.chain[1].hash = myChain.chain[1].calculateHash();

console.log("Is Blockchain valid ? " + myChain.isChainValid());
myChain.printOut();