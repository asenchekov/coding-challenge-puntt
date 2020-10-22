const moment = require('moment');
const calculatePaymentDays = require('./index.js');

describe('# calculatePaymentDays', () => {
  const result = calculatePaymentDays().split('\n')
    .map((el) => el.split(','))
    .slice(1, -1);

  describe('# Salary days', () => {
    result.forEach((month) => {
      const salaryDay = moment(month[0], 'YYYY-MM-DD');

      if (salaryDay.format('YYYY-MM-DD') === moment(salaryDay).endOf('month').format('YYYY-MM-DD')) {
        it('should not be saturday or sunday i.e. 0 or 6', () => {
          expect(salaryDay.day()).not.toBe(0);
          expect(salaryDay.day()).not.toBe(6);
        });
      } else {
        it('should be friday i.e. 5', () => {
          expect(salaryDay.day()).toBe(5);
        });
      }  
    });
  });
  
  describe('# Bonus days', () => {
    result.forEach((month) => {
      const bonusDay = moment(month[1], 'YYYY-MM-DD');

      if (bonusDay.format('YYYY-MM-DD') === moment(bonusDay).date(15).format('YYYY-MM-DD')) {
        it('date should not be saturday or sunday i.e. 0 or 6', () => {
          expect(bonusDay.day()).not.toBe(0);
          expect(bonusDay.day()).not.toBe(6);
        });
      } else {
        it('date should be wednesday i.e. 3', () => {
          expect(bonusDay.day()).toBe(3);
        });
      }  
    });
  });
});
