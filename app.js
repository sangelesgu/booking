const {
  inquirerMenu,
  pause
} = require('./helpers/inquirer');

const getDataFromStarChamps = require('./models/starHotel');
const getDataFromCondado = require('./models/condadoHotel');


const main = async () => {
  let opt = '';
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        getDataFromCondado()
          .then((rooms) => console.log(rooms))
          .catch((err) => console.log(err))
        break;

      case '2':

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