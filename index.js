const getRoundKeys = require('./util/KKeys/algorithm');


const cipherKey = ['49','1f','7a','65','de','28','3b','e0','bf','e8','46','2c','a4','0c','e6', '3b'];
console.log( getRoundKeys(cipherKey).map((item, index) => ({ [index]: item}) ) );
