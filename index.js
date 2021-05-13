const puppeteer = require('puppeteer');
const fs = require('fs');
const dayjs = require('dayjs');


const getDataFromCondado = async (checkIn = '13/05/2021', checkOut = '16 may 2021') => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.condadohotel.com/');
  await page.waitForTimeout(1500);
  await page.click('.pum-close')
  await page.focus('#datein');
  await page.waitForTimeout(1000);
  await page.$eval('#datein', (e) => e.removeAttribute("readonly"));
  await page.click('#datein', {
    clickCount: 3
  });
  await page.waitForTimeout(1000);
  await page.type('#datein', checkIn);
  await page.waitForTimeout(1000);
  await page.focus('#dateout');
  await page.$eval('#dateout', (e) => e.removeAttribute("readonly"));
  await page.waitForTimeout(1500);
  await page.click('#dateout', {
    clickCount: 3
  });
  await page.waitForTimeout(1000);
  await page.type('#dateout', checkOut);


};
getDataFromCondado();