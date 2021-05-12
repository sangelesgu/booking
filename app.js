import {
  inquirerMenu,
  pause
} from './helpers/inquirer';

import getDataFromStarChamps from './models/hotels';
import getTodaysDate from './helpers/date';

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
        console.log('Petit Ermitage');
        break;

      case '3':
        getDataFromStarChamps(checkInDate, checkOutDate);
        break;

      case '4':
        console.log('Cantara Grand Beach Resorts');
        break;

      case '0':
        console.clear();
        break;
      default:
        return;
    }

    await pause();
  } while (opt !== '0');
};

main();