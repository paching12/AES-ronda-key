const getRoundKeys = require('./util/KKeys/algorithm');


const cipherKey = ['49','1f','7a','65','de','28','3b','e0','bf','e8','46','2c','a4','0c','e6', '3b'];
console.log( getRoundKeys(cipherKey).map((item, index) => ({ [index]: item}) ) );


const expansion_table = [
    90, 82, 74, 66, 58, 50, 42, 34, 26, 18, 10, 2,
    92, 84, 76, 68, 60, 52, 44, 36, 28, 20, 12, 4,
    94, 86, 78, 70, 62, 54, 46, 38, 30, 22, 14, 6,
    96, 88, 80, 72, 64, 56, 48, 40, 32, 24, 16, 8,
    89, 81, 73, 65, 57, 49, 41, 33, 25, 17, 9, 1,
    91, 83, 75, 67, 59, 51, 43, 35, 27, 19, 11, 3,
    93, 85, 77, 69, 61, 53, 45, 37, 29, 21, 13, 5,
    95, 87, 79, 71, 63, 55, 47, 39, 31, 23, 15, 7,
];

let inverse_table = [];
expansion_table.forEach((item, index) => {
    console.log(item, index+1);
    inverse_table[item] = index+1; 
});

console.log(inverse_table);