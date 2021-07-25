let number = 3;

function createMagicSquare(number){
    let array =  Array(number);
    let magicSquare = Array.from(array,(x) => {return 0});
    magicSquare = magicSquare.map((x) => {return x = Array.from(Array(number),(x) => {return 0})});
    let counter = 1;
    let position = [Math.floor(number/2), number-1];

    if(number % 2 === 0){
        return 'Impossible';
    }
    
    for(let ch = 0; ch < number**2; ch++){
        magicSquare[position[0]][position[1]] = counter;
        position[0] = position[0]-1;
        position[1] = position[1]+1;

        if(position[0] < 0){
            position[0] = number + position[0];
        }
        
        else if(position[0] >= number){
            position[0] = position[0] - number;
        }

        if(position[1] < 0){
            position[1] = number + position[1];
        }
        else if(position[1] >= number){
            position[1] = position[1] - number;
        }

        if(magicSquare[position[0]][position[1]] !== 0){
            position[0] += 1;
            position[1] -= 2;
        }

        if(position[0] === -1 && position[1] === number){
            position[0] = 0;
            position[1] = number-2;
        }

        if(position[0] < 0){
            position[0] = number + position[0];
        }
        
        else if(position[0] >= number){
            position[0] = position[0] - number;
        }

        if(position[1] < 0){
            position[1] = number + position[1];
        }
        else if(position[1] >= number){
            position[1] = position[1] - number;
        }
        counter++;
    }
    return magicSquare;
}

createMagicSquare(number);