const getTodaysDate = () => {
  const today = new Date();
  const checkInDate = `${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()} ${today.toLocaleString('default', { month: 'short' })}`;
  const checkOutDate = `${today.getDate() + 2}/${(today.getMonth() + 1)}/${today.getFullYear()} ${today.toLocaleString('default', { month: 'short' })}`;
  return {
    checkInDate,
    checkOutDate,
  };
};

module.exports = getTodaysDate;