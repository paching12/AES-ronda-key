const { CIPHER_KEY,
    ITERATIONS_RCON,
    NK,
} = require('./constants');
const {
    hex2bin,
    bin2hex,
} = require('../conversions');
const {
    getFirst4Words,
    rotWord,
    getSubWord,
} = require('./rondaKeysFuncs');

const { xor } = require('../constants');

const unshiftZero = (word) => {
    return (word.length === 7) ? `0${word}` : word; 
};

const getKeys = (CK = null, debug = false) => {
    if(!Array.isArray(CK)) CK = null;
    const firstWords = getFirst4Words(CK || CIPHER_KEY);
    let words = [...firstWords];
    // console.log('words', words);
    for( let i = 4; i < 44; i++ ) {
        let temp = words[i-1];
        const tempOriginal = temp;
        let afterRotWord = null, afterSubWord = null, rcon = null, rconBin = null;

        // console.log('temp', temp);
        if (i%4 === 0) {
            afterRotWord = rotWord(temp);
            //console.log('rotWord', afterRotWord);

            // SubWord Process
            afterSubWord = getSubWord(afterRotWord);
            //console.log('afterSubWord', afterSubWord);

            // RCON Process 
                                // iteration number or index
            rcon = ITERATIONS_RCON[i];
            // console.log(rcon);

            const afterSubWordBin = hex2bin(afterSubWord);
            rconBin = hex2bin(rcon);

            // XOR with RCON
            temp = unshiftZero( bin2hex( xor(afterSubWordBin, rconBin) ) );
            // console.log('XOR with Rcon', temp);    
        }
        

        // Get New word !
        const wordTmpBin  = hex2bin(words[i-NK]);
        const tempBin = hex2bin(temp);
        // console.log(`words[${i}] = (temp XOR words[i-NK]) \n${temp} XOR ${words[i-NK]} = ${words[i]}`);
        words[i] = unshiftZero( bin2hex( xor(tempBin, wordTmpBin) ) );

        
        
        debug && console.log(`
        +===================================+
        |  temp: ${tempOriginal}
        |  After RotWord(): ${afterRotWord}
        |  After SubWord(): ${afterSubWord}
        |  Rcon[i/Nk]: ${rcon}
        |  After XOR with Rcon: ${temp}
        |  words[${i}]: ${words[i]}
        +===================================+`);
    }

    return words;
};


module.exports = getKeys;