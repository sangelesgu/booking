const puppeteer = require('puppeteer');
const fs = require('fs');
const dayjs = require('dayjs');


const getDataFromCondado = async (checkIn = '13/08/2021', checkOut = '24/08/2021') => {
  try {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://www.condadohotel.com/');
    await page.waitForTimeout(1500);
    await page.click('.pum-close');

    await page.focus('#datein');
    await page.waitForTimeout(1000);
    await page.$eval('#datein', (e) => e.removeAttribute("readonly"));
    await page.click('#datein', {
      clickCount: 3
    });
    await page.waitForTimeout(1000);
    await page.type('#datein', checkIn);

    await page.focus('#dateout');
    await page.waitForTimeout(1000);

    await page.$eval('#dateout', (e) => e.removeAttribute("readonly"));
    await page.waitForTimeout(3500);
    await page.click('#dateout', {
      clickCount: 3
    });
    await page.waitForTimeout(1000);
    await page.type('#dateout', checkOut);

    await page.waitForTimeout(500);
    await page.click('#bookingBtn');
    await page.waitForTimeout(4000);
    const pages = await browser.pages();
    await pages[2].waitForTimeout(4000);

    const checkInDate = dayjs(checkIn.replace('/', '').replace('08', 'aug')).locale('en').format('YYYY-MM-DD');
    const checkOutDate = dayjs(checkOut.replace('/', '').replace('08', 'aug')).locale('en').format('YYYY-MM-DD');

    const data = await pages[2].evaluate(() => {
      const $roomsRate = document.querySelectorAll('.wbkv9-Entity-container._3HdkwWnIugh-zhuIVBx3fR._2QLLr47Hq9q0kHTlq6e23R');
      const info = [];
      $roomsRate.forEach(($room) => {
        info.push({
          room: $room.querySelector('.wbkv9-Entity-name').textContent.trim(),
          minPrice: Number($room.querySelector('.wbkv9-Amount-integerPart').textContent.trim()),
          currency: $room.querySelector('.wbkv9-Entity-amountCurrencyLabel').textContent.trim().replace('desde', '').trim().replace('/', ''),
          language: document.querySelector('#innerContainer > div.sc-grYksN.eRRCtv._3COuE0NyRXV218J1PxC9oT > div > div.wbkv9-FooterMenu-menuContainer._2JSfYNFYpPdL7afk46q4Jp > div > div:nth-child(1) > div > div > div:nth-child(2)').textContent.trim(),
          guests: Number(document.querySelector('.sc-dNLxif').textContent.trim()),
        });

      });
      return info
    });

    browser.close();

    return {
      checkIN: checkInDate,
      checkOut: checkOutDate,
      data
    }
  } catch (error) {
    return error
  }
};

module.exports = getDataFromCondado