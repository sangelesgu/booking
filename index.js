const puppeteer = require('puppeteer');
const fs = require('fs');
const dayjs = require('dayjs');


const getDataFromErmitage = async (checkIn = '13/08/2021', checkOut = '24/08/2021') => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto('https://reservations.travelclick.com/110426');
  await page.waitForTimeout(1500);

  await page.click('.btn-promo')
  await page.waitForTimeout(200);
  await page.click('.GuestsAndRoomsForm-select');


};

getDataFromErmitage()