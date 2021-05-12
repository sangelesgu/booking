import puppeteer from 'puppeteer';

import fs from 'fs';

const getDataFromStarChamps = async (checkIn = '12 May 2021', checkOut = '16 May 2021') => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const rooms = [];
  await page.goto('https://www.secure-hotel-booking.com/smart/Star-Champs-Elysees/2YXB/es/');

  await page.type('.check-in-datepicker', checkIn);
  const checkOutInput = await page.$('.check-out-datepicker');
  await checkOutInput.click({
    clickCount: 10,
  });

  await page.type('#adults', '2');
  await page.type('#children', '1');
  await page.click('#applicationHost > div > div.page-background > div.page-main.page-host > header > div.change-filters > div > p > a');
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const $roomsRate = document.querySelectorAll('.this-room-rates');
    const info = [];
    $roomsRate.forEach(($room) => {
      info.push({
        checkinDate: document.querySelector('.check-in-datepicker').value.trim(),
        checkeoutDate: document.querySelector('.check-out-datepicker').value.trim(),
        minPrice: $room.querySelector('.room-rates-item-price-moy').textContent.trim(),
        conditions: $room.querySelector('.room-rates-item-title-meal-plan').textContent.trim(),
        currency: document.querySelector('.menu-currency-item-link span').textContent.trim(),
        occupancy: {
          adults: Number(document.querySelector('#applicationHost > div > div.page-background > div.page-main.page-host > header > div.filters-wrapper.mtn.mbs > p > span.filters-occupancy > span:nth-child(1)').textContent.trim()),
          child: Number(document.querySelector('#applicationHost > div > div.page-background > div.page-main.page-host > header > div.filters-wrapper.mtn.mbs > p > span.filters-occupancy > span:nth-child(4) > span:nth-child(1)').textContent.trim()),
        },
        totalAmount: $room.querySelector('[data-bind="text: formattedTotalPrice"]').textContent.trim(),
        language: document.querySelector('#applicationHost > div > div.page-head.js-page-head > div.this-menu-language > ul > li:nth-child(3) > a > span:nth-child(2)').textContent.trim(),
      });
    });
    return info;
  });
  return data;
};
getDataFromStarChamps()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.warn(err, 'catch Error');
  });

export default getDataFromStarChamps;