function calcBulbsAmount(number, bulbsNumbers) {
  let array = Array(number);
  let bulbsArray = array.fill(false);

  for (let counter = 0; counter < bulbsNumbers.length; counter++) {
    for (let counter1 = 0; counter1 < bulbsArray.length; counter1++) {
      if ([counter1 + 1] % bulbsNumbers[counter] === 0) {
        bulbsArray[counter1] = bulbsArray[counter1] ? false : true;
      }
    }
  }

  let turnOnBulbs = bulbsArray.filter((x) => Boolean(x));
  return turnOnBulbs.length;
}

calcBulbsAmount(20, [2, 3, 8]);
