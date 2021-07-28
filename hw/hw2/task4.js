function createMagicSquare(number) {
  let array = Array(number);
  let magicSquare = array.fill(0);
  magicSquare = magicSquare.map((x) => {
    x = Array.from(array.fill(0));
    return x;
  });

  let startNumber = 1;
  let position = [Math.floor(number / 2), number - 1];

  if (number % 2 === 0) {
    return "Impossible";
  }

  for (let counter = 0; counter < number ** 2; counter++) {
    magicSquare[position[0]][position[1]] = startNumber;
    position[0] = position[0] - 1;
    position[1] = position[1] + 1;

    if (position[0] < 0) {
      position[0] = number + position[0];
    } else if (position[0] >= number) {
      position[0] = position[0] - number;
    }

    if (position[1] < 0) {
      position[1] = number + position[1];
    } else if (position[1] >= number) {
      position[1] = position[1] - number;
    }

    if (magicSquare[position[0]][position[1]] !== 0) {
      position[0] += 1;
      position[1] -= 2;
    }

    if (position[0] === -1 && position[1] === number) {
      position[0] = 0;
      position[1] = number - 2;
    }

    if (position[0] < 0) {
      position[0] = number + position[0];
    } else if (position[0] >= number) {
      position[0] = position[0] - number;
    }

    if (position[1] < 0) {
      position[1] = number + position[1];
    } else if (position[1] >= number) {
      position[1] = position[1] - number;
    }
    startNumber++;
  }
  return magicSquare;
}

createMagicSquare(3);
