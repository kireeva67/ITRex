let startNumber = 1; 
let addedNumber = 2;

function changeNumber() {
    startNumber += addedNumber;
    if(startNumber !== 0 && startNumber % 5 === 0){
        startNumber /= 5;
        addedNumber = 3;
        return startNumber;
    }
    else if (startNumber !== 0 && startNumber % 7 === 0){
        startNumber -= 7;
        addedNumber = 1;
        return startNumber;
    }

    return startNumber;
}