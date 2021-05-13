const {
  inquirerMenu,
  pause
} = require('./helpers/inquirer');

const getDataFromStarChamps = require('./models/hotels');
const getTodaysDate = require('./helpers/date');
const dayjs = require('dayjs');

const {
  checkInDate,
  checkOutDate,
} = getTodaysDate();

const main = async () => {
  let opt = '';
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':

        break;

      case '2':
        console.log(checkInDate, '11-01-2021')
        console.log(dayjs(checkInDate).locale('en').format('YYYY-MM-DD'));
        break;

      case '3':
        getDataFromStarChamps()
          .then((data) => console.log(data))
          .catch((err) => console.log(err))
        break;

      case '4':
        console.log('Cantara Grand Beach Resorts');
        break;

      default:
        return;
    }

    await pause();
  } while (opt !== '0');
};

main();