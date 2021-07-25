let number = 20;
let bulbsNumbers = [2, 3, 8];
let array = Array(number);
let bulbsArray = Array.from(array,(x) => {return false});

for(let ch = 0; ch < bulbsNumbers.length; ch++){
    for(let ch1 = 0; ch1 < bulbsArray.length; ch1++){
        if([ch1+1] % bulbsNumbers[ch] === 0){
            bulbsArray[ch1] = (bulbsArray[ch1])? false:true;
        }
    }
}

let turnOnBulbs = bulbsArray.filter((x) => {return x === true});
let turnOnBulbsAmount = turnOnBulbs.length;

console.log(turnOnBulbsAmount);
