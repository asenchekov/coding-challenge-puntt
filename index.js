/*
 *  Simple CLI that calculates salary payment days
 *  and bonus payment days for 12 months from the current month
 */

// importing required packages
const moment = require('moment');
const { createArrayCsvStringifier } = require('csv-writer');

// repetative value of date format
const dateFormat = 'YYYY-MM-DD';

const currentMonth = moment().startOf('month');

// array to populate with dates
const records = [];

// looping from current to 12th month from now
for (let month = 0; month < 12; month += 1) {

  const salaryDay = moment(currentMonth).endOf('month');
  const bonusDay = moment(currentMonth).date(15);

  records[month] = [];

  // check if the salary day is during the weekend and adjust to the last friday
  // then push it to the array
  if (salaryDay.day() === 0)
    records[month].push(salaryDay.isoWeekday('friday').format(dateFormat));
  else if (salaryDay.day() === 6) 
    records[month].push(salaryDay.isoWeekday('friday').format(dateFormat));
  else
    records[month].push(salaryDay.format(dateFormat));

  // check if bonus day is during the weekend and adjust it to the next wednesday
  // then push it to the array
  if (bonusDay.day() === 0)
    records[month].push(bonusDay.add(3, 'days').format(dateFormat));
  else if (bonusDay.day() === 6)
    records[month].push(bonusDay.add(4, 'days').format(dateFormat));
  else
    records[month].push(bonusDay.format(dateFormat));

  // change current month to next month
  currentMonth.add(1, 'month');
}

// array with headers of the csv like string
const header = [ 'Salary', 'Bonus' ];

// put header on first place in the array
records.unshift(header);

// stringify the array data to csv like string
const payDates = createArrayCsvStringifier({
  alwaysQuote: true,
}).stringifyRecords(records);

console.log(payDates);
