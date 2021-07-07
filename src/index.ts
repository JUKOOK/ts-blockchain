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
  ): string => {
    return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
  };

  static validate = (block: Block): boolean => {
    return (
      typeof block.index === "number" &&
      typeof block.hash === "string" &&
      typeof block.prevHash === "string" &&
      typeof block.data === "string" &&
      typeof block.timestamp === "number"
    );
  };

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

let blockchain: Block[] = [];

const getBlockchain = (): Block[] => {
  return blockchain;
};

const getLatestBlock = (): Block => {
  const blockchain = getBlockchain();
  const length = blockchain.length;

  return length ? blockchain[length - 1] : undefined;
};

const getNewTimeStamp = (): number => {
  return Math.round(new Date().getTime() / 1000);
};

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatestBlock();
  const newIndex: number = prevBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    prevBlock.hash,
    newTimeStamp,
    data
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    prevBlock.hash,
    data,
    newTimeStamp
  );
  return newBlock;
};

const getHashOfBlock = (block: Block): string => {
  const { index, prevHash, timestamp, data } = block;
  return Block.calculateBlockHash(index, prevHash, timestamp, data);
};

const isBlockValid = (targetBlock: Block, prevBlock: Block): Boolean => {
  if (!Block.validate(targetBlock)) return false;
  else if (prevBlock.index + 1 !== targetBlock.index) return false;
  else if (prevBlock.hash !== targetBlock.prevHash) return false;
  else if (getHashOfBlock(targetBlock) !== targetBlock.hash) return false;
  else return true;
};

const addBlock = (block: Block): void => {
  if (isBlockValid(block, getLatestBlock())) blockchain.push(block);
};

// ---

const genesisBlock: Block = new Block(
  0,
  Block.calculateBlockHash(0, "", 1000000, "First, Hello"),
  "",
  "First, Hello",
  10000000
);

blockchain = [genesisBlock];

console.log(blockchain);

addBlock(createNewBlock("Second, Good"));
// console.log(blockchain);

addBlock(createNewBlock("Third, Bye"));
// console.log(blockchain);

addBlock(createNewBlock("Final!!, Yeah"));
console.log(blockchain);

/*
[
  Block {
    index: 0,
    hash: '27d768646bc39bee8e5d65bd6222581ad892e4044eec952b4273239aed7a0737',
    prevHash: '',
    data: 'First, Hello',
    timestamp: 10000000
  },
  Block {
    index: 1,
    hash: '8cf4718095b7dc9931b64f8dc8d7084aca69de76c613665fca0087e29f171eaa',
    prevHash: '27d768646bc39bee8e5d65bd6222581ad892e4044eec952b4273239aed7a0737',
    data: 'Second, Good',
    timestamp: 1625615696
  },
  Block {
    index: 2,
    hash: 'd048ff5a820229dcecccd6492a20b764e5b36e744fa38873f7ec97b97fda609c',
    prevHash: '8cf4718095b7dc9931b64f8dc8d7084aca69de76c613665fca0087e29f171eaa',
    data: 'Third, Bye',
    timestamp: 1625615696
  },
  Block {
    index: 3,
    hash: '09f36571be4af74e5082a721dd257ab54daf1914bab58f1ab8367f76bca3722b',
    prevHash: 'd048ff5a820229dcecccd6492a20b764e5b36e744fa38873f7ec97b97fda609c',
    data: 'Final!!, Yeah',
    timestamp: 1625615696
  }
]
*/
