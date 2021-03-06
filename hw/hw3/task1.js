"use strict";
class StringFormatter {
  removeNonUniqueChars(string) {
    let stringWithoutDoubleChars = "";
    string = string.split("");
    stringWithoutDoubleChars = string.reduce((char1, char2) => {
      if (char1.indexOf(char2) === -1) {
        return char1 + char2;
      }
      return char1;
    });

    return stringWithoutDoubleChars;
  }
}

const stringWithoutDoubleChars = new StringFormatter();
console.log(stringWithoutDoubleChars.removeNonUniqueChars("Hello,, world55"));

class StringFormatterForNumbers extends StringFormatter {
  removeNonUniqueChars(string) {
    let stringWithoutDoubleNumbers = "";
    string = string.split("");
    stringWithoutDoubleNumbers = string.reduce((char1, char2) => {
      if (isNaN(char2)) {
        return char1 + char2;
      } else {
        if (char1.indexOf(char2) === -1) {
          return char1 + char2;
        }
        return char1;
      }
    });
    return stringWithoutDoubleNumbers;
  }
}

const stringWithoutDoubleNumbers = new StringFormatterForNumbers();
console.log(stringWithoutDoubleNumbers.removeNonUniqueChars("Hello,, world55"));

class StringFormatterForDates extends StringFormatter {
  removeNonUniqueChars(string, dateFormat) {
    let stringWithoutDoubleDates = "";
    let datesArray = [];
    for (let counter = 0; counter < string.length; counter++) {
      if (!isNaN(string[counter])) {
        let date = string.slice(counter, counter + dateFormat.length);
        let match = true;

        for (let counter1 = 0; counter1 < dateFormat.length; counter1++) {
          if (dateFormat[counter1] === "x" && isNaN(date[counter1])) {
            match = false;
            break;
          } else if (
            dateFormat[counter1] !== "x" &&
            dateFormat[counter1] !== date[counter1]
          ) {
            match = false;
            break;
          }
        }
        if (match && datesArray.indexOf(date) === -1) {
          datesArray.push(date);
          stringWithoutDoubleDates += date;
          counter += date.length;
        } else if (match && datesArray.indexOf(date) !== -1) {
          counter += date.length;
        }
        if (!match) {
          stringWithoutDoubleDates += string[counter];
        }
      } else {
        stringWithoutDoubleDates += string[counter];
      }
    }
    return stringWithoutDoubleDates;
  }
}

const stringWithoutDoubleDates = new StringFormatterForDates();
console.log(
  stringWithoutDoubleDates.removeNonUniqueChars(
    "20.07.2021 Hello, 20.07.2021, world55 20.07.2021",
    "xx.xx.xxxx"
  )
);
