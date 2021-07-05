import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

  // static -> Block 객체를 생성하지 않고도, Blcok 클래스로부터 직접 사용이 가능한 메소드
  static calculateBlockHash = (
    index: number,
    prevHash: string,
    timestamp: number,
    data: string
  ): string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

// const createNewBlock(data: string) : Block {
//     const prevBlock: Block = getLastBlock();
//     const newIndex: number = prevBlock.index + 1;
//     const newTimeStamp: number= getNewTimeStamp();
//     const newHash: string = Block.calcu
// }

const genesisBlock: Block = new Block(
  0,
  "r1r3fqfcvzxvg",
  "",
  "First, Hello",
  10000000
);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => {
  return blockchain;
};

const getLatestBlock = (): Block => {
  return blockchain[blockchain.length - 1];
};

const getNewTimeStamp = (): number => {
  return Math.round(new Date().getTime() / 1000);
};

console.log(blockchain);
