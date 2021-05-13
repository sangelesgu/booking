const dayjs = require('dayjs');

const getTodaysDate = () => {
  const today = new Date();
  const checkInDate = `${today.getDate()}-0${(today.getMonth() + 1)}-${today.getFullYear()}`;
  const checkOutDate = `${today.getDate() + 3}-${(today.getMonth() + 1)}-${today.getFullYear()}`;
  dayjs(checkInDate).locale('en')
  return {
    checkInDate,
    checkOutDate,
  };
};

module.exports = getTodaysDate;