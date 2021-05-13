const inquirer = require('inquirer');
require('colors');

const menuOptions = [

  {
    type: 'list',
    name: 'option',
    message: 'What hotel do you want to get rooms?',
    choices: [{
        value: '1',
        name: `${'1.'.green} Hotel Condado`,
      },
      {
        value: '2',
        name: `${'2.'.green} Petit Ermitage`,
      },
      {
        value: '3',
        name: `${'3.'.green} Hotel Star Champs-Elysées`,
      },
      {
        value: '4',
        name: `${'4.'.green} Cantara Grand Beach Resorts`,
      },
      {
        value: '0',
        name: `${'0.'.green} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('|=====================================|'.green);
  console.log('         Choice an option: '.white);
  console.log('|=====================================|\n'.green);

  const {
    option
  } = await inquirer.prompt(menuOptions);
  return option;
};

const pause = async () => {
  const pausa = [{
    type: 'input',
    name: 'push',
    message: `Wait for results. Press ${'Enter'.blue} to continue`,
  }, ];
  console.log('\n');
  await inquirer.prompt(pausa);
};

module.exports = {
  inquirerMenu,
  pause,
};