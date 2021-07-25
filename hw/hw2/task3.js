let copiesNumber = 6;
let firstCopierSpeed = 1;
let secondCopierSpeed = 2;


//Сounts how long it takes to create copies

function makeCopy(copiesNumber, firstCopierSpeed, secondCopierSpeed){
    let timeAmount = 0;
    let firstWorkedLastTime = 0;
    let secondWorkedLastTime = 0;

    if(copiesNumber < 1){
        return timeAmount;
    }

    if(firstCopierSpeed < secondCopierSpeed){
        timeAmount += firstCopierSpeed;
        copiesNumber--;
        firstWorkedLastTime = firstCopierSpeed;
        secondWorkedLastTime = firstCopierSpeed;
    }
    else if(firstCopierSpeed >= secondCopierSpeed){
        timeAmount += secondCopierSpeed;
        copiesNumber--;
        secondWorkedLastTime = secondCopierSpeed;
        firstWorkedLastTime = secondCopierSpeed;
    }
    while(true){
        if(timeAmount - firstWorkedLastTime === firstCopierSpeed){
            copiesNumber--;
            firstWorkedLastTime = timeAmount;
        }
        if(timeAmount - secondWorkedLastTime === secondCopierSpeed){
            copiesNumber--;
            secondWorkedLastTime = timeAmount;
        }
        if(copiesNumber <= 0){
            return timeAmount;
        }
        timeAmount++;
    }
}

console.log(makeCopy(copiesNumber, firstCopierSpeed, secondCopierSpeed));
    