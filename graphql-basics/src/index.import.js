import currentLoc, { logString, name } from './myModule'
import addUp, { subtract } from './mathModule'

console.log(logString+' love, '+name+currentLoc('Downers Grove'));

console.log('3+7='+addUp(3,7));

let c = 15, d = 1.5;
console.log(c+'-'+d+'='+subtract(c,d));