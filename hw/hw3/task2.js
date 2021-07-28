"use strict";

class AbstratcResultNumerals {
  multipliction(firstNumber, secondNumber) {}
  division(firstNumber, secondNumber) {}
  addition(firstNumber, secondNumber) {}
  substraction(firstNumber, secondNumber) {}
  toCurrentNumberType(result) {}
}

class ResultInArabicNumerals extends AbstratcResultNumerals {
  multipliction(firstNumber, secondNumber) {
    return this.toCurrentNumberType(firstNumber * secondNumber);
  }
  division(firstNumber, secondNumber) {
    return this.toCurrentNumberType(Math.floor(firstNumber / secondNumber));
  }
  addition(firstNumber, secondNumber) {
    return this.toCurrentNumberType(firstNumber + secondNumber);
  }
  substraction(firstNumber, secondNumber) {
    return this.toCurrentNumberType(firstNumber - secondNumber);
  }
  toCurrentNumberType(result) {
    return result;
  }
}

const resultInArabic = new ResultInArabicNumerals();
console.log(
  resultInArabic.multipliction(5, 2),
  resultInArabic.division(5, 2),
  resultInArabic.addition(5, 2),
  resultInArabic.substraction(5, 2)
);

class ResultInMorseCode extends ResultInArabicNumerals {
  morseCode = {
    0: "−−−−−",
    1: "•−−−−",
    2: "••−−−",
    3: "•••−−",
    4: "••••−",
    5: "•••••",
    6: "−••••",
    7: "−−•••",
    8: "−−−••",
    9: "−−−−•",
  };

  toCurrentNumberType(result) {
    let resultInMorse = "";
    result = result.toString();
    for (let counter = 0; counter < result.length; counter++) {
      for (let key in this.morseCode) {
        if (result[counter] === key) {
          resultInMorse += this.morseCode[key];
        }
      }
    }
    return resultInMorse;
  }
}

const resultInMorse = new ResultInMorseCode();
console.log(
  resultInMorse.multipliction(5, 2),
  resultInMorse.division(5, 2),
  resultInMorse.addition(5, 2),
  resultInMorse.substraction(5, 2)
);

class ResultInRomanNumerals extends ResultInArabicNumerals {
  romanNumerals = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    20: "XX",
    30: "XXX",
    40: "XL",
    50: "L",
    60: "LX",
    70: "LXX",
    80: "LXXX",
    90: "XC",
    100: "C",
    200: "CC",
    300: "CCC",
    400: "CD",
    500: "D",
    600: "DC",
    700: "DCC",
    800: "DCCC",
    900: "CM",
    1000: "M",
    2000: "MM",
    3000: "MMM",
  };
  toCurrentNumberType(result) {
    let resultInRoman = "";
    let previous = 0;
    while (result > 0) {
      for (let key in this.romanNumerals) {
        if (key > result) {
          resultInRoman += this.romanNumerals[previous];
          result -= previous;
          break;
        }
        previous = key;
      }
    }
    return resultInRoman;
  }
}

const resultInRoman = new ResultInRomanNumerals();
console.log(
  resultInRoman.multipliction(100, 2),
  resultInRoman.division(100, 2),
  resultInRoman.addition(100, 2),
  resultInRoman.substraction(100, 2)
);
