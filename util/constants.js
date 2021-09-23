
const xor = (word, word2) => {
    if(typeof word !== 'string' || typeof word2 !== 'string')
        throw new Error('xor func, both words need to be string');

    if (word.length !== word2.length) 
        throw new Error('xor func, words don\'t have the same length');

    let xorString = [];
    for(let i = 0; i < word.length; i++)
        xorString[i] = word[i] === word2[i] ? '0' : '1';

    return xorString.join('');
}

module.exports = {
    xor,
}