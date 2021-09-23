const { CIPHER_KEY,
    SUBBYTESTABLE,
    ITERATIONS_RCON } = require('./keys');

const { xor } = require('../constants');
const {
    hex2bin
} = require('../conversions');


const TYPE_VALUE = 'HEX';

const getTypeValue = (value, type) => {
    let cast = null;
    switch(type || TYPE_VALUE) {
        case 'HEX':
            cast = 16;
        break;
        case 'DEC':
            cast = 10;
        break;
        case 'OCT':
            cast = 8;
        break;
        default:
            cast = 2;
    }
    return TYPE_VALUE == null ? value : value.toString(cast); 
}

const getFirst4Words = (CK) => {
    if (!Array.isArray(CK)) throw new Error('getFirstWords just accept array parameter with hex values');
    const words = [];
    try {
        for(let i = 0; i < CK.length; i = i+4 ) {
            let word = null;
            for(let j = i; j < (i+3); j++) {
                word = !word ? CK[j] : word;
                word = ByteConcat(getTypeValue(word, 'HEX'), getTypeValue(CK[j+1], 'HEX'));
            }
            words[i/4] = getTypeValue(word);
        }
    } catch(error) {
        console.error('getFirstWords function', error);
    }
    return words;
};

const ByteConcat = (item, item2) => {
   return item+item2;
};

const rotWord = (word) => {
    if (word.length > 8 || word.length < 1) throw new Error('This word needs 4 bytes (8 caracters)');  
    let newRotWord = word;
    const firstByte = newRotWord.substr(0,2);
    newRotWord = newRotWord.substr(2,newRotWord.length)+firstByte;
    return newRotWord;
};

const getSubWord = (byte) => {
    const firstNibble  = byte[0];
    const secondNibble = byte[1]; 
    return SUBBYTESTABLE[firstNibble][secondNibble];
};

console.log('words', getFirst4Words(CIPHER_KEY));
const afterRotWord = rotWord('09cf4f3c');
console.log('rotWord', afterRotWord);

// SubWord Process
let afterSubWord = '';
for(let i = 0; i < afterRotWord.length; i=i+2) {
    const byte   = afterRotWord[i]+afterRotWord[i+1];
    afterSubWord += getSubWord(byte);
}

console.log('afterSubWord', afterSubWord);

// RCON Process 
                    // iteration number or index
const rcon = ITERATIONS_RCON[4];
console.log(rcon);

const afterSubWordHex = hex2bin(afterSubWord);
const rconHex = hex2bin(rcon);

// XOR with RCON
const afterXor = xor(afterSubWordHex, rconHex);
console.log();

