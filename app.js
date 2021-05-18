const {
  inquirerMenu,
  pause
} = require('./helpers/inquirer');

const getDataFromStarChamps = require('./models/starHotel');
const getDataFromCondado = require('./models/condadoHotel');
const getDataFromErmitage = require('./models/ermitageHotel');
const {
  saveDB
} = require('./helpers/saveFile');


const main = async () => {
  let opt = '';
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        getDataFromCondado()
          .then((rooms) => saveDB(rooms))
          .catch((err) => console.log(err))
        break;

      case '2':
        getDataFromErmitage()
          .then((data) => console.log(data))
        break;

      case '3':
        getDataFromStarChamps()
          .then((data) => saveDB(data))
          .catch((err) => console.log(err))
        break;

      default:
        return;
    }

    await pause();
  } while (opt !== '0');
};

main();