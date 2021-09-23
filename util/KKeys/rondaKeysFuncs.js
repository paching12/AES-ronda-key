const { 
    SUBBYTESTABLE
} = require('./constants');

const getFirst4Words = (CK) => {
    if (!Array.isArray(CK)) throw new Error('getFirstWords just accept array parameter with hex values');
    const words = [];
    try {
        for(let i = 0; i < CK.length; i = i+4 ) {
            let word = null;
            for(let j = i; j < (i+3); j++) {
                word = !word ? CK[j] : word;
                word = `${word}${CK[j+1]}`;
            }
            words[i/4] = word;
        }
    } catch(error) {
        console.error('getFirstWords function', error);
    }
    return words;
};

const rotWord = (word) => {
    if (word.length > 8 || word.length < 1) throw new Error('This word needs 4 bytes (8 caracters)');  
    let newRotWord = word;
    const firstByte = newRotWord.substr(0,2);
    newRotWord = newRotWord.substr(2,newRotWord.length)+firstByte;
    return newRotWord;
};

const getSubByteFromTable = (byte) => {
    const firstNibble  = byte[0];
    const secondNibble = byte[1]; 
    return SUBBYTESTABLE[firstNibble][secondNibble];
}

const getSubWord = (afterRotWord) => {
    let afterSubWord = '';
    for(let i = 0; i < afterRotWord.length; i=i+2) {
        const byte   = afterRotWord[i]+afterRotWord[i+1];
        afterSubWord += getSubByteFromTable(byte);
    }
    return afterSubWord;
};

module.exports = {
    getFirst4Words,
    rotWord,
    getSubWord,
}