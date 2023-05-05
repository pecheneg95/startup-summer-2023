import { Salary } from 'types/types';

const formatSalaryText = ({
  payment,
  payment_from,
  payment_to,
  currency,
}: Salary) => {
  let result = 'з/п ';

  if (payment) {
    result = result + ' ' + payment + ` ${currency}`;
  } else if (payment_from && payment_to && payment_from === payment_to) {
    result = result + ' ' + payment_from + ` ${currency}`;
  } else if (payment_from && payment_to) {
    result = result + payment_from + ' - ' + payment_to + ` ${currency}`;
  } else if (payment_from) {
    result = result + ' от ' + payment_from + ` ${currency}`;
  } else if (payment_to) {
    result = result + ' до ' + payment_to + ` ${currency}`;
  } else {
    result = result + ' не указана';
  }

  return result;
};

export { formatSalaryText };
