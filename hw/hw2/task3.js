let copiesNumber = 6;
let x = 1;
let y = 2;


function makeCopy(copiesNumber, x, y){
    let timeAmount = 0;
    let xWorkedLastTime = 0;
    let yWorkedLastTime = 0;

    if(copiesNumber < 1){
        return timeAmount;
    }

    if(x < y){
        timeAmount += x;
        copiesNumber--;
        xWorkedLastTime = x;
        yWorkedLastTime = x;
    }
    else if(x >= y){
        timeAmount += y;
        copiesNumber--;
        yWorkedLastTime = y;
        xWorkedLastTime = y;
    }
    while(true){
        if(timeAmount - xWorkedLastTime === x){
            copiesNumber--;
            xWorkedLastTime = timeAmount;
        }
        if(timeAmount - yWorkedLastTime === y){
            copiesNumber--;
            yWorkedLastTime = timeAmount;
        }
        if(copiesNumber <= 0){
            return timeAmount;
        }
        timeAmount++;
    }
}

console.log(makeCopy(copiesNumber, x, y));
    