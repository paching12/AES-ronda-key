const removeHexSymbol = (hex) => hex.replace("0x", "").toLowerCase();

const  hex2bin = (hex) => {
    hex = removeHexSymbol(hex);
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }
    return out;
};

const bin2hex = (binaryNumber) => parseInt(binaryNumber, 2).toString(16);

const TYPE_VALUE = 'HEX';

const getStringTypeValue = (value, type) => {
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

module.exports = {
    hex2bin,
    bin2hex,
    getStringTypeValue,
    removeHexSymbol,
};