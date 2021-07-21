let maxNumber = 5;
let minNumber = 1;


function setABS(num) { 
    if(num >= minNumber && num <= maxNumber){
        console.log(`ABS:${num}`);
        return;
    }
    throw new Error(`Invalid num value`);
}


function setTraction(num) {
    if(num >= minNumber && num <= maxNumber){
        console.log(`Traction Control:${num}`);
        return;
    }
    throw new Error(`Invalid num value`);
}


function setStability(num) {
    if(num >= minNumber && num <= maxNumber){
        console.log(`Stability Control:${num}`);
        return;
    }
    throw new Error(`Invalid num value`);
}


function begginer(){
    setABS(5);
    setTraction(5);
    setStability(5);
}

function goodDriver(){
    setABS(3);
    setTraction(3);
    setStability(3);
}


function Maniac() {
    setABS(1);
    setTraction(1);
    setStability(1);
}